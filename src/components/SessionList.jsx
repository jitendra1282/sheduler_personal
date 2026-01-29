import { format, parseISO, isPast } from 'date-fns';
import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

const SessionList = ({ sessions, onToggle, onDelete }) => {
    // Sort sessions: Incomplete first, then by time. Completed at bottom.
    const sortedSessions = [...sessions].sort((a, b) => {
        if (a.completed === b.completed) {
            return new Date(a.startTime) - new Date(b.startTime);
        }
        return a.completed ? 1 : -1;
    });

    if (sessions.length === 0) {
        return (
            <div className="text-center text-muted py-12 glass-panel">
                <p>No study sessions scheduled yet. Time to plan!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {sortedSessions.map((session) => {
                const start = parseISO(session.startTime);
                const end = parseISO(session.endTime);
                const isDone = session.completed;
                const isExpired = !isDone && isPast(end);

                return (
                    <div
                        key={session.id}
                        className={`glass-panel p-4 flex items-center gap-4 transition-all group ${isDone ? 'opacity-50' : ''}`}
                    >
                        <label className="relative cursor-pointer">
                            <input
                                type="checkbox"
                                className="custom-checkbox"
                                checked={isDone}
                                onChange={() => onToggle(session.id)}
                            />
                        </label>

                        <div className="flex-1">
                            <h3 className={`font-semibold text-lg ${isDone ? 'line-through text-muted' : ''}`}>
                                {session.subject}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted mt-1">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {format(start, 'EEE, d MMM')} • {format(start, 'h:mm a')} - {format(end, 'h:mm a')}
                                </span>
                                {isExpired && <span className="text-danger flex items-center gap-1">• Overdue</span>}
                            </div>
                        </div>

                        <button
                            onClick={() => onDelete(session.id)}
                            className="p-2 text-muted hover:text-danger hover:bg-white/5 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="Delete Session"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default SessionList;
