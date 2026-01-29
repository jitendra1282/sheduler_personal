import { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            setError("Firebase configuration is missing.");
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const loginWithGoogle = () => {
        if (!auth) {
            alert("Cannot login: Firebase config is missing.");
            return Promise.reject("Firebase config missing");
        }
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        if (!auth) return Promise.resolve();
        return signOut(auth);
    };

    const value = {
        currentUser,
        loginWithGoogle,
        logout
    };

    if (error) {
        return (
            <div className="loading-container">
                <div className="loading-content">
                    <div className="spinner" style={{ borderColor: 'var(--danger)', borderTopColor: 'transparent' }}></div>
                    <h2 className="login-title" style={{ fontSize: '1.2rem', color: 'var(--danger)' }}>Configuration Error</h2>
                    <p className="loading-help" style={{ color: 'var(--text-main)', maxWidth: '24rem' }}>
                        The Firebase configuration is missing or invalid. <br /><br />
                        Please create a project in Firebase Console, get your keys, and add them to the <code>.env</code> file in your project root.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="loading-container">
                    <div className="loading-content">
                        <div className="spinner"></div>
                        <p className="loading-text">Initializing Scheduler...</p>
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
