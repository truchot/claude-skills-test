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

# Ensure directory exists
mkdir -p "$(dirname "$LOG_FILE")" 2>/dev/null || true

# Get skill name from argument or environment
SKILL_NAME="${1:-$SKILL_NAME}"

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
SAFE_SKILL=$(json_escape "${SKILL_NAME:-unknown}")
SAFE_SESSION=$(json_escape "${CLAUDE_SESSION_ID:-}")

# Append to JSONL log (one JSON object per line)
# Using printf to avoid issues with echo and special characters
printf '{"timestamp":"%s","skill":"%s","session":"%s"}\n' \
  "$TIMESTAMP" \
  "$SAFE_SKILL" \
  "$SAFE_SESSION" >> "$LOG_FILE" 2>/dev/null || true

# Exit successfully (don't block the skill invocation)
exit 0
