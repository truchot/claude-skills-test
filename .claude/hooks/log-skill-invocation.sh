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
mkdir -p "$(dirname "$LOG_FILE")"

# Get skill name from argument or environment
SKILL_NAME="${1:-$SKILL_NAME}"

# Create log entry
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Append to JSONL log (one JSON object per line)
echo "{\"timestamp\":\"$TIMESTAMP\",\"skill\":\"$SKILL_NAME\",\"session\":\"$CLAUDE_SESSION_ID\"}" >> "$LOG_FILE"

# Exit successfully (don't block the skill invocation)
exit 0
