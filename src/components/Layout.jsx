import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, CalendarDays, LogOut, CheckSquare } from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error("Failed to log out");
        }
    };

    // Get page title based on route
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/': return "Good morning,";
            case '/plan': return "Your Plan";
            default: return "Scheduler";
        }
    };

    const getPageSubtitle = () => {
        switch (location.pathname) {
            case '/': return "Today's Overview";
            case '/plan': return "Manage your schedule";
            default: return "";
        }
    };

    // Get user initials
    const initials = currentUser?.email ? currentUser.email.substring(0, 2).toUpperCase() : 'U';

    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="logo-area">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <CheckSquare size={20} color="white" fill="none" />
                    </div>
                    <span className="logo-text">Dulist</span>
                </div>

                <nav className="nav-links">
                    <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/plan" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <CalendarDays />
                        <span>My Plan</span>
                    </NavLink>
                </nav>
            </aside>

            <main className="main-content">
                <header className="header">
                    <div className="header-title">
                        <p>{getPageTitle()}</p>
                        <h1>{getPageSubtitle()}</h1>
                    </div>

                    <div className="profile-section">
                        <div className="user-text">
                            <div className="user-name">{currentUser?.displayName || 'User'}</div>
                            <div className="sign-out-text" onClick={handleLogout}>Sign Out</div>
                        </div>
                        <div className="profile-avatar">
                            {initials}
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
