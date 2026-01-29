import SessionList from '../components/SessionList';
import { useSessions } from '../hooks/useSessions';

const Dashboard = () => {
    const { sessions, toggleSession, deleteSession } = useSessions();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Schedule</h1>
                    <p className="text-muted">Track your progress and upcoming tasks.</p>
                </div>
                <div className="glass-panel px-4 py-2 rounded-full text-sm">
                    <span className="text-primary font-bold">{sessions.filter(s => s.completed).length}</span>
                    <span className="text-muted mx-1">/</span>
                    <span className="text-muted">{sessions.length} Completed</span>
                </div>
            </div>

            <SessionList
                sessions={sessions}
                onToggle={toggleSession}
                onDelete={deleteSession}
            />
        </div>
    );
};

export default Dashboard;
