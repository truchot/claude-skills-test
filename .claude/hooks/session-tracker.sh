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

# ============================================================
# SECURITY FUNCTIONS
# ============================================================

# Validate path is within allowed directory (prevent path traversal)
validate_path() {
    local path="$1"
    local allowed_base="$2"

    # Resolve to absolute path and check it's within allowed base
    local resolved_path
    resolved_path="$(realpath -m "$path" 2>/dev/null)" || return 1

    local resolved_base
    resolved_base="$(realpath -m "$allowed_base" 2>/dev/null)" || return 1

    # Check if resolved path starts with allowed base
    case "$resolved_path" in
        "$resolved_base"/*|"$resolved_base")
            return 0
            ;;
        *)
            echo "Security error: Path traversal detected" >&2
            return 1
            ;;
    esac
}

# Sanitize input string (remove dangerous characters)
sanitize_input() {
    local input="$1"
    # Remove shell metacharacters, keep only safe chars
    echo "$input" | tr -cd '[:alnum:][:space:]._-' | head -c 200
}

# Validate UUID format
is_valid_uuid() {
    local uuid="$1"
    [[ "$uuid" =~ ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$ ]]
}

# Validate tool name (whitelist approach)
is_valid_tool_name() {
    local tool="$1"
    local valid_tools="Bash Edit Write Read Glob Grep Task WebFetch WebSearch TodoWrite"
    [[ " $valid_tools " == *" $tool "* ]]
}

# ============================================================
# CONFIGURATION (with security checks)
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Security: Ensure PROJECT_ROOT is resolved and valid
PROJECT_ROOT="$(realpath "$PROJECT_ROOT" 2>/dev/null)" || {
    echo "Error: Cannot resolve project root" >&2
    exit 1
}

# Security: Ensure we're in a git repo (sanity check)
if [ ! -d "$PROJECT_ROOT/.git" ] && [ ! -d "$PROJECT_ROOT/.web-agency" ]; then
    echo "Error: Not in a valid project directory" >&2
    exit 1
fi

STATE_MANAGER_DIR="$PROJECT_ROOT/.web-agency/state-manager"
PROJECT_DATA_DIR="$PROJECT_ROOT/.project"
SESSION_FILE="$PROJECT_DATA_DIR/current-session.json"
LOG_FILE="$PROJECT_DATA_DIR/hook-activity.log"

# Validate all paths are within PROJECT_ROOT
validate_path "$PROJECT_DATA_DIR" "$PROJECT_ROOT" || exit 1
validate_path "$SESSION_FILE" "$PROJECT_ROOT" || exit 1
validate_path "$LOG_FILE" "$PROJECT_ROOT" || exit 1

# Ensure directories exist (with restricted permissions)
mkdir -p "$PROJECT_DATA_DIR"
chmod 700 "$PROJECT_DATA_DIR" 2>/dev/null || true

# Logging function (with sanitization)
log() {
    local msg
    msg="$(sanitize_input "$*")"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $msg" >> "$LOG_FILE"
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

# Start a new session (with input validation)
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

    # Security: Validate project_id is a valid UUID
    if ! is_valid_uuid "$project_id"; then
        log "Invalid project ID format rejected"
        echo "Error: Invalid project ID format" >&2
        return 1
    fi

    # Security: Sanitize description
    local safe_description
    safe_description="$(sanitize_input "$description")"

    local session_id
    session_id=$(generate_session_id)
    local branch
    branch=$(get_branch)
    local timestamp
    timestamp=$(date -Iseconds)

    # Security: Sanitize branch name
    local safe_branch
    safe_branch="$(sanitize_input "$branch")"

    # Create session file using Python for proper JSON escaping
    python3 -c "
import json

data = {
    'sessionId': '''$session_id''',
    'projectId': '''$project_id''',
    'startTime': '''$timestamp''',
    'branch': '''$safe_branch''',
    'description': '''$safe_description''',
    'actions': [],
    'toolUsage': {}
}

with open('''$SESSION_FILE''', 'w') as f:
    json.dump(data, f, indent=2)
"

    log "Session started: $session_id (project: $project_id, branch: $safe_branch)"
    echo "Session started: $session_id"
}

# Log a tool use (with input validation)
log_tool_use() {
    local tool_name="$1"
    local tool_input="${2:-}"

    # Security: Validate tool name
    if ! is_valid_tool_name "$tool_name"; then
        log "Invalid tool name rejected: $(sanitize_input "$tool_name")"
        return 1
    fi

    if ! is_session_active; then
        # Auto-start session if not active
        start_session "" "Auto-started Claude Code session"
    fi

    if [ ! -f "$SESSION_FILE" ]; then
        return 1
    fi

    local timestamp
    timestamp=$(date -Iseconds)

    # Security: Sanitize tool_name for use in Python (already validated above)
    local safe_tool_name
    safe_tool_name="$(sanitize_input "$tool_name")"

    # Update session file with tool usage
    if command -v python3 &> /dev/null; then
        python3 -c "
import json
import sys

TOOL_NAME = '''$safe_tool_name'''
TIMESTAMP = '''$timestamp'''
SESSION_FILE = '''$SESSION_FILE'''

try:
    with open(SESSION_FILE, 'r') as f:
        session = json.load(f)

    # Add action
    action = {
        'timestamp': TIMESTAMP,
        'type': 'tool_use',
        'tool': TOOL_NAME,
        'description': f'Used {TOOL_NAME}'
    }
    session.setdefault('actions', []).append(action)

    # Update tool usage stats
    tool_usage = session.setdefault('toolUsage', {})
    tool_usage[TOOL_NAME] = tool_usage.get(TOOL_NAME, 0) + 1

    with open(SESSION_FILE, 'w') as f:
        json.dump(session, f, indent=2)

except Exception as e:
    print(f'Error updating session: {e}', file=sys.stderr)
    sys.exit(1)
"
    fi

    log "Tool used: $safe_tool_name"
}

# End the session (with input validation)
end_session() {
    local summary="${1:-Session ended}"

    if ! is_session_active; then
        log "No active session to end"
        return 0
    fi

    # Security: Sanitize summary
    local safe_summary
    safe_summary="$(sanitize_input "$summary")"

    local timestamp
    timestamp=$(date -Iseconds)

    # Update session with end time
    if command -v python3 &> /dev/null; then
        python3 -c "
import json
import os
import re
from datetime import datetime

SESSION_FILE = '''$SESSION_FILE'''
TIMESTAMP = '''$timestamp'''
SUMMARY = '''$safe_summary'''
PROJECT_DATA_DIR = '''$PROJECT_DATA_DIR'''

try:
    with open(SESSION_FILE, 'r') as f:
        session = json.load(f)

    session['endTime'] = TIMESTAMP
    session['summary'] = SUMMARY

    # Calculate duration
    start = datetime.fromisoformat(session['startTime'].replace('Z', '+00:00'))
    end = datetime.fromisoformat(TIMESTAMP.replace('Z', '+00:00'))
    session['durationMinutes'] = int((end - start).total_seconds() / 60)

    # Archive session
    archive_dir = os.path.join(PROJECT_DATA_DIR, 'sessions')
    os.makedirs(archive_dir, exist_ok=True)

    # Security: Validate sessionId format before using in filename
    session_id = session.get('sessionId', '')
    if not re.match(r'^session-[0-9]+-[a-f0-9]+$', session_id):
        raise ValueError('Invalid session ID format')

    archive_file = os.path.join(archive_dir, f'{session_id}.json')

    # Security: Ensure archive_file is within archive_dir
    if not os.path.realpath(archive_file).startswith(os.path.realpath(archive_dir)):
        raise ValueError('Path traversal detected')

    with open(archive_file, 'w') as f:
        json.dump(session, f, indent=2)

    print(f'Session archived: {archive_file}')

except Exception as e:
    print(f'Error ending session: {e}')
"
    fi

    # Remove current session file
    rm -f "$SESSION_FILE"

    log "Session ended: $safe_summary"
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
