import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Activity } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const activeStyle = ({ isActive }) => 
        isActive ? "text-teal-400 font-bold border-b-2 border-teal-400 pb-1" : "text-white hover:text-teal-200 transition";

    return (
        <nav className="bg-teal-800 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <Activity className="h-8 w-8 text-teal-300" />
                    <span className="text-xl font-extrabold tracking-wider">DocAppoint</span>
                </Link>

                <div className="flex items-center space-x-6">
                    <NavLink to="/" className={activeStyle}>Home</NavLink>
                    <NavLink to="/appointments" className={activeStyle}>All Appointment</NavLink>
                    <NavLink to="/dashboard" className={activeStyle}>Dashboard</NavLink>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-3">
                            <img src={user.photoURL} alt="profile" className="w-9 h-9 rounded-full border-2 border-teal-300 object-cover" />
                            <button onClick={() => { logout(); navigate('/'); }} className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-sm font-semibold transition">Logout</button>
                        </div>
                    ) : (
                        <div className="space-x-2">
                            <Link to="/login" className="hover:text-teal-200 font-semibold px-3 py-1.5 text-sm">Login</Link>
                            <Link to="/register" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-1.5 rounded text-sm transition">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;