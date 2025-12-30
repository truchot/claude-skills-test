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

SKILL_NAME=$(validate_skill_name "$SKILL_NAME")
if [[ -z "$SKILL_NAME" ]]; then
  SKILL_NAME="unknown"
fi

# Log rotation function
rotate_logs() {
  if [[ -f "$LOG_FILE" ]]; then
    local file_size
    file_size=$(stat -c%s "$LOG_FILE" 2>/dev/null || stat -f%z "$LOG_FILE" 2>/dev/null || echo 0)

    if [[ "$file_size" -gt "$MAX_LOG_SIZE" ]]; then
      # Rotate existing logs
      for i in $(seq $((MAX_ROTATED_LOGS - 1)) -1 1); do
        if [[ -f "${LOG_FILE}.$i" ]]; then
          mv "${LOG_FILE}.$i" "${LOG_FILE}.$((i + 1))" 2>/dev/null || true
        fi
      done

      # Move current log to .1
      mv "$LOG_FILE" "${LOG_FILE}.1" 2>/dev/null || true

      # Remove oldest log if it exists
      rm -f "${LOG_FILE}.$((MAX_ROTATED_LOGS + 1))" 2>/dev/null || true
    fi
  fi
}

# Perform log rotation if needed
rotate_logs

# Create log entry with timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

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

# Append to JSONL log (one JSON object per line)
# Using printf to avoid issues with echo and special characters
printf '{"timestamp":"%s","skill":"%s","session":"%s"}\n' \
  "$TIMESTAMP" \
  "$SAFE_SKILL" \
  "$SAFE_SESSION" >> "$LOG_FILE" 2>/dev/null || true

# Exit successfully (don't block the skill invocation)
exit 0
