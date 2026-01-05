#!/bin/bash
#
# Hook: Log Skill Invocation
#
# Logs skill invocations for routing validation analysis.
# Captures: timestamp, skill invoked, user query context
#
# Usage: Add to .claude/settings.json hooks configuration
#
# Environment variables passed by Claude Code:
#   SKILL_NAME - The skill being invoked
#   USER_QUERY - The user's query (if available)
#

# Validate HOME environment variable
if [[ -z "$HOME" ]] || [[ ! -d "$HOME" ]] || [[ "$HOME" != /* ]]; then
  # HOME is unset, not a directory, or not absolute path - use fallback
  HOME_DIR="/tmp"
else
  HOME_DIR="$HOME"
fi

LOG_FILE="${HOME_DIR}/.claude/monitoring/routing/invocation-log.jsonl"
LOCK_FILE="${LOG_FILE}.lock"
MAX_LOG_SIZE=10485760  # 10MB in bytes
MAX_ROTATED_LOGS=5     # Keep 5 rotated logs

# Ensure directory exists
mkdir -p "$(dirname "$LOG_FILE")" 2>/dev/null || true

# Get skill name from argument or environment
SKILL_NAME="${1:-$SKILL_NAME}"

# Input validation: sanitize skill name (allow only alphanumeric, hyphens, underscores, slashes)
# This prevents injection attacks and ensures clean log data
validate_skill_name() {
  local name="$1"
  # Remove any character that isn't alphanumeric, hyphen, underscore, slash, or dot
  echo "$name" | tr -cd 'a-zA-Z0-9_/-.'
}

# Validate timestamp format (ISO 8601)
validate_timestamp() {
  local ts="$1"
  # Match YYYY-MM-DDTHH:MM:SSZ format strictly
  if [[ "$ts" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$ ]]; then
    echo "$ts"
  else
    # Fallback to epoch if system time is compromised
    echo "1970-01-01T00:00:00Z"
  fi
}

SKILL_NAME=$(validate_skill_name "$SKILL_NAME")
if [[ -z "$SKILL_NAME" ]]; then
  SKILL_NAME="unknown"
fi

# Log rotation function (called within lock)
# Uses atomic operations with temp files to prevent partial rotations
rotate_logs_unlocked() {
  if [[ -f "$LOG_FILE" ]]; then
    local file_size
    file_size=$(stat -c%s "$LOG_FILE" 2>/dev/null || stat -f%z "$LOG_FILE" 2>/dev/null || echo 0)

    if [[ "$file_size" -gt "$MAX_LOG_SIZE" ]]; then
      local temp_dir
      temp_dir=$(dirname "$LOG_FILE")

      # Use mktemp for guaranteed atomic uniqueness (not PID which can be reused)
      local rotation_marker
      rotation_marker=$(mktemp "${temp_dir}/.rotation_XXXXXX" 2>/dev/null) || return 0

      # Cleanup marker on exit
      trap "rm -f '$rotation_marker'" RETURN

      # Remove oldest log first to make room
      rm -f "${LOG_FILE}.$MAX_ROTATED_LOGS" 2>/dev/null || true

      # Rotate existing logs (from oldest to newest)
      for i in $(seq $((MAX_ROTATED_LOGS - 1)) -1 1); do
        if [[ -f "${LOG_FILE}.$i" ]]; then
          mv -f "${LOG_FILE}.$i" "${LOG_FILE}.$((i + 1))" 2>/dev/null || true
        fi
      done

      # Atomically move current log to .1 using temp file pattern
      if [[ -f "$LOG_FILE" ]]; then
        # Create temp file with unique name using mktemp
        local temp_file
        temp_file=$(mktemp "${LOG_FILE}.tmp.XXXXXX" 2>/dev/null) || return 0
        if cp "$LOG_FILE" "$temp_file" 2>/dev/null; then
          mv -f "$temp_file" "${LOG_FILE}.1" 2>/dev/null || rm -f "$temp_file"
          # Truncate original instead of removing (preserves inode for any open handles)
          : > "$LOG_FILE" 2>/dev/null || true
        else
          rm -f "$temp_file" 2>/dev/null || true
        fi
      fi

      rm -f "$rotation_marker" 2>/dev/null || true
    fi
  fi
}

# Create log entry with validated timestamp
RAW_TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
TIMESTAMP=$(validate_timestamp "$RAW_TIMESTAMP")

# Function to escape JSON string (RFC 8259 compliant)
# Escapes: backslash, quotes, and all control characters (0x00-0x1F)
json_escape() {
  local str="$1"
  local result=""
  local i char code

  for ((i=0; i<${#str}; i++)); do
    char="${str:$i:1}"
    case "$char" in
      \\) result+='\\' ;;
      '"') result+='\"' ;;
      $'\n') result+='\n' ;;
      $'\r') result+='\r' ;;
      $'\t') result+='\t' ;;
      $'\b') result+='\b' ;;
      $'\f') result+='\f' ;;
      *)
        # Check for other control characters (0x00-0x1F)
        code=$(printf '%d' "'$char" 2>/dev/null || echo 0)
        if [[ "$code" -lt 32 ]]; then
          # Escape as \u00XX
          result+=$(printf '\\u%04x' "$code")
        else
          result+="$char"
        fi
        ;;
    esac
  done

  echo "$result"
}

# Escape values for safe JSON
SAFE_SKILL=$(json_escape "$SKILL_NAME")
SAFE_SESSION=$(json_escape "${CLAUDE_SESSION_ID:-}")
SAFE_TIMESTAMP=$(json_escape "$TIMESTAMP")

# Pre-construct the log line to avoid format string issues
# This is safer than using printf with variables in the format string
LOG_LINE="{\"timestamp\":\"${SAFE_TIMESTAMP}\",\"skill\":\"${SAFE_SKILL}\",\"session\":\"${SAFE_SESSION}\"}"

# Set restrictive umask BEFORE creating lock file (fixes race condition)
# This ensures the lock file itself has proper permissions from creation
old_umask=$(umask)
umask 077

# Use flock for atomic log operations (rotation + write)
# This prevents race conditions when multiple hooks run concurrently
(
  # Acquire exclusive lock (timeout 5 seconds)
  if command -v flock &>/dev/null; then
    flock -w 5 200 || exit 0
  fi

  # Perform log rotation if needed
  rotate_logs_unlocked

  # Append to JSONL log (one JSON object per line)
  # Using echo with pre-constructed string for safety
  echo "$LOG_LINE" >> "$LOG_FILE" 2>/dev/null || true

) 200>"$LOCK_FILE"

# Restore original umask
umask "$old_umask"

# Exit successfully (don't block the skill invocation)
exit 0
