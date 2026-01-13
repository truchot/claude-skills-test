#!/bin/bash
#
# Claude Code Session Tracker Hook
#
# Ce script est appelé par les hooks Claude Code pour tracker automatiquement
# les sessions de travail dans le StateManager.
#
# Usage (appelé par Claude Code):
#   ./session-tracker.sh <event_type> [tool_name] [additional_data]
#
# Event types:
#   session_start  - Début de session Claude
#   tool_use       - Utilisation d'un outil (Bash, Edit, Write, etc.)
#   session_end    - Fin de session
#

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
STATE_MANAGER_DIR="$PROJECT_ROOT/.web-agency/state-manager"
PROJECT_DATA_DIR="$PROJECT_ROOT/.project"
SESSION_FILE="$PROJECT_DATA_DIR/current-session.json"
LOG_FILE="$PROJECT_DATA_DIR/hook-activity.log"

# Ensure directories exist
mkdir -p "$PROJECT_DATA_DIR"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# Get or create project ID
get_project_id() {
    if [ -f "$PROJECT_DATA_DIR/projects.json" ]; then
        # Get first project ID from projects.json
        if command -v jq &> /dev/null; then
            jq -r '.[0].id // empty' "$PROJECT_DATA_DIR/projects.json" 2>/dev/null || echo ""
        elif command -v python3 &> /dev/null; then
            python3 -c "import json; data=json.load(open('$PROJECT_DATA_DIR/projects.json')); print(data[0]['id'] if data else '')" 2>/dev/null || echo ""
        else
            echo ""
        fi
    else
        echo ""
    fi
}

# Check if session is active
is_session_active() {
    [ -f "$SESSION_FILE" ]
}

# Get current branch
get_branch() {
    git -C "$PROJECT_ROOT" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown"
}

# Generate session ID
generate_session_id() {
    echo "session-$(date +%s)-$(head -c 4 /dev/urandom | xxd -p)"
}

# Start a new session
start_session() {
    local project_id="$1"
    local description="${2:-Claude Code session}"

    if is_session_active; then
        log "Session already active, skipping start"
        return 0
    fi

    if [ -z "$project_id" ]; then
        project_id=$(get_project_id)
    fi

    if [ -z "$project_id" ]; then
        log "No project ID available, cannot start session"
        return 1
    fi

    local session_id=$(generate_session_id)
    local branch=$(get_branch)
    local timestamp=$(date -Iseconds)

    # Create session file
    cat > "$SESSION_FILE" << EOF
{
  "sessionId": "$session_id",
  "projectId": "$project_id",
  "startTime": "$timestamp",
  "branch": "$branch",
  "description": "$description",
  "actions": [],
  "toolUsage": {}
}
EOF

    log "Session started: $session_id (project: $project_id, branch: $branch)"
    echo "Session started: $session_id"
}

# Log a tool use
log_tool_use() {
    local tool_name="$1"
    local tool_input="${2:-}"

    if ! is_session_active; then
        # Auto-start session if not active
        start_session "" "Auto-started Claude Code session"
    fi

    if [ ! -f "$SESSION_FILE" ]; then
        return 1
    fi

    local timestamp=$(date -Iseconds)

    # Update session file with tool usage
    if command -v python3 &> /dev/null; then
        python3 << EOF
import json
import sys

try:
    with open('$SESSION_FILE', 'r') as f:
        session = json.load(f)

    # Add action
    action = {
        "timestamp": "$timestamp",
        "type": "tool_use",
        "tool": "$tool_name",
        "description": "Used $tool_name"
    }
    session.setdefault('actions', []).append(action)

    # Update tool usage stats
    tool_usage = session.setdefault('toolUsage', {})
    tool_usage[$tool_name] = tool_usage.get("$tool_name", 0) + 1

    with open('$SESSION_FILE', 'w') as f:
        json.dump(session, f, indent=2)

except Exception as e:
    print(f"Error updating session: {e}", file=sys.stderr)
    sys.exit(1)
EOF
    fi

    log "Tool used: $tool_name"
}

# End the session
end_session() {
    local summary="${1:-Session ended}"

    if ! is_session_active; then
        log "No active session to end"
        return 0
    fi

    local timestamp=$(date -Iseconds)

    # Update session with end time
    if command -v python3 &> /dev/null; then
        python3 << EOF
import json
import os
from datetime import datetime

try:
    with open('$SESSION_FILE', 'r') as f:
        session = json.load(f)

    session['endTime'] = "$timestamp"
    session['summary'] = "$summary"

    # Calculate duration
    start = datetime.fromisoformat(session['startTime'].replace('Z', '+00:00'))
    end = datetime.fromisoformat("$timestamp".replace('Z', '+00:00'))
    session['durationMinutes'] = int((end - start).total_seconds() / 60)

    # Archive session
    archive_dir = '$PROJECT_DATA_DIR/sessions'
    os.makedirs(archive_dir, exist_ok=True)

    archive_file = os.path.join(archive_dir, f"{session['sessionId']}.json")
    with open(archive_file, 'w') as f:
        json.dump(session, f, indent=2)

    print(f"Session archived: {archive_file}")

except Exception as e:
    print(f"Error ending session: {e}")
EOF
    fi

    # Remove current session file
    rm -f "$SESSION_FILE"

    log "Session ended: $summary"
    echo "Session ended and archived"
}

# Get session status
get_status() {
    if ! is_session_active; then
        echo "No active session"
        return 0
    fi

    if command -v python3 &> /dev/null; then
        python3 << EOF
import json
from datetime import datetime

with open('$SESSION_FILE', 'r') as f:
    session = json.load(f)

start = datetime.fromisoformat(session['startTime'].replace('Z', '+00:00'))
duration = int((datetime.now(start.tzinfo or None) - start).total_seconds() / 60)

print(f"""
Session: {session['sessionId']}
Project: {session['projectId']}
Branch:  {session['branch']}
Started: {session['startTime']}
Duration: {duration} minutes
Actions: {len(session.get('actions', []))}
Tools:   {session.get('toolUsage', {})}
""")
EOF
    else
        cat "$SESSION_FILE"
    fi
}

# Main entry point
main() {
    local event_type="${1:-}"
    shift || true

    case "$event_type" in
        session_start|start)
            start_session "$@"
            ;;
        tool_use|tool)
            log_tool_use "$@"
            ;;
        session_end|end|stop)
            end_session "$@"
            ;;
        status)
            get_status
            ;;
        *)
            echo "Usage: $0 <session_start|tool_use|session_end|status> [args...]"
            echo ""
            echo "Events:"
            echo "  session_start [project_id] [description]  - Start a new session"
            echo "  tool_use <tool_name> [input]              - Log tool usage"
            echo "  session_end [summary]                     - End current session"
            echo "  status                                    - Show session status"
            exit 1
            ;;
    esac
}

main "$@"
