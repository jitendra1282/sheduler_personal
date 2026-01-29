import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookMarked, LogIn } from 'lucide-react';

const Login = () => {
    const { loginWithGoogle, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (error) {
            console.error("Login failed", error);
            alert("Failed to log in. Check console for details.");
        }
    };

    if (currentUser) {
        navigate('/');
        return null;
    }

    return (
        <div className="login-page">
            <div className="shape-blob blob-1" />
            <div className="shape-blob blob-2" />

            <div className="login-card animate-fade-in">
                <div className="login-icon-box">
                    <BookMarked className="w-8 h-8" />
                </div>

                <h1 className="login-title">Dulist</h1>
                <p className="login-subtitle">Plan your day, achieve your goals.</p>

                <button
                    onClick={handleLogin}
                    className="google-btn"
                >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>

                <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    By continuing, you accept our Terms of Service.
                </p>
            </div>
        </div>
    );
};

export default Login;
