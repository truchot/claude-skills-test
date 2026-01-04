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

LOG_FILE="${HOME}/.claude/monitoring/routing/invocation-log.jsonl"
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
      local rotation_marker="${temp_dir}/.rotation_in_progress_$$"

      # Create rotation marker (atomic via O_EXCL)
      if ! (set -o noclobber; echo $$ > "$rotation_marker") 2>/dev/null; then
        # Another rotation in progress, skip
        return 0
      fi

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

      # Atomically move current log to .1 using hard link + unlink pattern
      if [[ -f "$LOG_FILE" ]]; then
        # Create temp file with unique name
        local temp_file="${LOG_FILE}.tmp.$$"
        if cp "$LOG_FILE" "$temp_file" 2>/dev/null; then
          mv -f "$temp_file" "${LOG_FILE}.1" 2>/dev/null || rm -f "$temp_file"
          # Truncate original instead of removing (preserves inode for any open handles)
          : > "$LOG_FILE" 2>/dev/null || true
        fi
      fi

      rm -f "$rotation_marker" 2>/dev/null || true
    fi
  fi
}

# Create log entry with validated timestamp
RAW_TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
TIMESTAMP=$(validate_timestamp "$RAW_TIMESTAMP")

# Function to escape JSON string (handle quotes and special chars)
json_escape() {
  local str="$1"
  # Escape backslashes first, then quotes, then control characters
  str="${str//\\/\\\\}"
  str="${str//\"/\\\"}"
  str="${str//$'\n'/\\n}"
  str="${str//$'\r'/\\r}"
  str="${str//$'\t'/\\t}"
  echo "$str"
}

# Escape values for safe JSON
SAFE_SKILL=$(json_escape "$SKILL_NAME")
SAFE_SESSION=$(json_escape "${CLAUDE_SESSION_ID:-}")
SAFE_TIMESTAMP=$(json_escape "$TIMESTAMP")

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
  # Using printf to avoid issues with echo and special characters
  printf '{"timestamp":"%s","skill":"%s","session":"%s"}\n' \
    "$SAFE_TIMESTAMP" \
    "$SAFE_SKILL" \
    "$SAFE_SESSION" >> "$LOG_FILE" 2>/dev/null || true

) 200>"$LOCK_FILE"

# Exit successfully (don't block the skill invocation)
exit 0
