import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-50">
            <h1 className="text-6xl font-extrabold text-teal-800 mb-2">404</h1>
            <p className="text-xl font-bold text-gray-800 mb-4">Oops! Page Not Found</p>
            <p className="text-gray-500 max-w-md mb-6 text-sm">The route URL string segment you requested does not exist or has been modified permanently.</p>
            <Link to="/" className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-2 rounded shadow transition">Return Home</Link>
        </div>
    );
};

export default NotFound;