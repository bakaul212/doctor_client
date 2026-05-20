import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('docUser');
        const token = localStorage.getItem('docToken');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const loginUser = (email, password) => {
        setLoading(true);
        // সিম্পল মক সাকসেস লগইন
        const mockUser = {
            name: "Rahim Uddin",
            email: email,
            photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150"
        };
        localStorage.setItem('docUser', JSON.stringify(mockUser));
        localStorage.setItem('docToken', 'mock-jwt-token-from-server');
        setUser(mockUser);
        setLoading(false);
        return true;
    };

    const registerUser = (name, email, photo) => {
        setLoading(true);
        const mockUser = { name, email, photoURL: photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150" };
        localStorage.setItem('docUser', JSON.stringify(mockUser));
        localStorage.setItem('docToken', 'mock-jwt-token-from-server');
        setUser(mockUser);
        setLoading(false);
        return true;
    };

    const logout = () => {
        setLoading(true);
        localStorage.removeItem('docUser');
        localStorage.removeItem('docToken');
        setUser(null);
        setLoading(false);
    };

    const updateUserProfile = (name, photo) => {
        const updated = { ...user, name, photoURL: photo };
        localStorage.setItem('docUser', JSON.stringify(updated));
        setUser(updated);
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logout, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};