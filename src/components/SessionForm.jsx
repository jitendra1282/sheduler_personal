import { useState } from 'react';
import { Plus, Clock, BookOpen, Calendar as CalendarIcon } from 'lucide-react';
import { format, parse, isAfter } from 'date-fns';

const SessionForm = ({ onAdd }) => {
    const [subject, setSubject] = useState('');
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [startTime, setStartTime] = useState(format(new Date(), 'HH:mm'));
    const [endTime, setEndTime] = useState(format(new Date(), 'HH:mm')); // Default to now, user changes it

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!subject || !date || !startTime || !endTime) return;

        // Construct Date objects
        const startDateTime = parse(`${date} ${startTime}`, 'yyyy-MM-dd HH:mm', new Date());
        const endDateTime = parse(`${date} ${endTime}`, 'yyyy-MM-dd HH:mm', new Date());

        if (!isAfter(endDateTime, startDateTime)) {
            alert('End time must be after start time!');
            return;
        }

        onAdd({
            subject,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString()
        });

        setSubject('');
        // Keep date/time as is for easier successive entry
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel p-6 mb-8 animate-fade-in">
            <h2 className="text-xl mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" /> New Session
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Subject */}
                <div className="relative group">
                    <BookOpen className="absolute left-3 top-3.5 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Subject (e.g. Physics)"
                        className="input-field pl-10"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>

                {/* Date */}
                <div className="relative group">
                    <CalendarIcon className="absolute left-3 top-3.5 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
                    <input
                        type="date"
                        className="input-field pl-10"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                {/* Start Time */}
                <div className="relative group">
                    <Clock className="absolute left-3 top-3.5 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
                    <input
                        type="time"
                        className="input-field pl-10"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>

                {/* End Time (Replaced Duration) */}
                <div className="flex gap-2">
                    <div className="relative group flex-1">
                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
                        <input
                            type="time"
                            className="input-field pl-10"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary px-6 flex items-center justify-center gap-2">
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SessionForm;
