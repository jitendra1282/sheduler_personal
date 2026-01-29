import { useState, useEffect } from 'react';
import { isAfter, parseISO } from 'date-fns';
import { db, auth } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, updateDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const useSessions = () => {
    const [sessions, setSessions] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
        });
        return unsub;
    }, []);

    // Subscribe to Firestore updates
    useEffect(() => {
        if (!user) {
            setSessions([]);
            return;
        }

        try {
            const q = query(
                collection(db, 'sessions'),
                where('userId', '==', user.uid),
                orderBy('startTime')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const sessionsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setSessions(sessionsData);
            }, (error) => {
                console.error("Error fetching sessions:", error);
            });
            return () => unsubscribe();
        } catch (e) {
            console.error("Firebase init error:", e);
        }
    }, [user]);

    // Check for reminders
    useEffect(() => {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            sessions.forEach(session => {
                if (session.completed || session.notified) return;

                const start = parseISO(session.startTime);
                if (isAfter(now, start)) {
                    if (Notification.permission === 'granted') {
                        new Notification(`Time to study: ${session.subject}`, {
                            body: `Your session for ${session.subject} is starting now!`,
                            icon: '/vite.svg'
                        });
                    }
                    if (user) {
                        updateDoc(doc(db, 'sessions', session.id), { notified: true });
                    }
                }
            });
        }, 30000);

        return () => clearInterval(interval);
    }, [sessions, user]);

    const addSession = async (sessionData) => {
        if (!user) return;
        try {
            await addDoc(collection(db, 'sessions'), {
                ...sessionData,
                userId: user.uid,
                completed: false,
                notified: false,
                createdAt: new Date().toISOString()
            });
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Failed to save to Firebase. Check console.");
        }
    };

    const toggleSession = async (id) => {
        if (!user) return;
        const session = sessions.find(s => s.id === id);
        if (!session) return;
        try {
            await updateDoc(doc(db, 'sessions', id), {
                completed: !session.completed
            });
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    const deleteSession = async (id) => {
        if (!user) return;
        try {
            await deleteDoc(doc(db, 'sessions', id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    return { sessions, addSession, toggleSession, deleteSession };
};
