// --- Login.jsx ---
import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const success = loginUser(email, password);
        if(success) navigate(redirectPath, { replace: true });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full border">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Login to Account</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                        <input type="email" required onChange={e=>setEmail(e.target.value)} className="w-full border p-2.5 rounded focus:outline-teal-600"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                        <input type="password" required onChange={e=>setPassword(e.target.value)} className="w-full border p-2.5 rounded focus:outline-teal-600"/>
                    </div>
                    <button type="submit" className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold p-2.5 rounded transition">Login</button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">Don't have an account? <Link to="/register" className="text-teal-600 font-semibold hover:underline">Register</Link></p>
            </div>
        </div>
    );
};