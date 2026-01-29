import SessionForm from '../components/SessionForm';
import { useSessions } from '../hooks/useSessions';

const Planner = () => {
    const { addSession } = useSessions();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Plan Your Success</h1>
                <p className="text-muted">Schedule your upcoming study sessions.</p>
            </div>
            <SessionForm onAdd={addSession} />
        </div>
    );
};

export default Planner;
