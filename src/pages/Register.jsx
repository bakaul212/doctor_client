// --- Register.jsx ---
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { registerUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        
        // Password Validation Rules
        if(password.length < 6) { setError('Password must be at least 6 characters long.'); return; }
        if(!/[A-Z]/.test(password)) { setError('Must contain at least 1 uppercase letter.'); return; }
        if(!/[a-z]/.test(password)) { setError('Must contain at least 1 lowercase letter.'); return; }

        registerUser(name, email, photo);
        alert('Registration Successful!');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full border">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Create Register Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                    <div><label className="text-sm block text-gray-700">Full Name</label><input type="text" required onChange={e=>setName(e.target.value)} className="w-full border p-2 rounded"/></div>
                    <div><label className="text-sm block text-gray-700">Email Address</label><input type="email" required onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded"/></div>
                    <div><label className="text-sm block text-gray-700">Photo URL</label><input type="url" onChange={e=>setPhoto(e.target.value)} className="w-full border p-2 rounded"/></div>
                    <div><label className="text-sm block text-gray-700">Password</label><input type="password" required onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded"/></div>
                    <button type="submit" className="w-full bg-teal-700 text-white font-bold p-2 rounded hover:bg-teal-800">Register</button>
                </form>
                <p className="text-sm text-center mt-4">Already have an account? <Link to="/login" className="text-teal-600 font-semibold">Login</Link></p>
            </div>
        </div>
    );
};