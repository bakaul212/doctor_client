import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Star, ShieldCheck, Clock } from 'lucide-react';

const Home = () => {
    const [doctors, setDoctors] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // রিয়েল ডাটার জন্য ব্যাকএন্ড URL চেঞ্জ করে দেবেন, এখানে মক করা হলো ফ্রন্টএন্ডে
        fetch('http://localhost:5000/top-doctors')
            .then(res => res.json())
            .then(data => setDoctors(data.slice(0,3)))
            .catch(() => {
                // Fallback local data
                setDoctors([
                    { _id: "d1", name: "Dr. Ayesha Rahman", specialty: "Cardiologist", fee: 800, rating: 5, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400" },
                    { _id: "d2", name: "Dr. Asif Chowdhury", specialty: "Neurologist", fee: 1000, rating: 4.9, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400" },
                    { _id: "d3", name: "Dr. Sadiya Afrin", specialty: "Pediatrician", fee: 700, rating: 4.8, image: "https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=400" }
                ]);
            });
    }, []);

    const handleViewDetails = (id) => {
        if (user) {
            navigate(`/doctors/${id}`);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-teal-800 to-teal-600 text-white py-20 px-4 text-center rounded-b-3xl shadow-xl">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Your Health, Our Supreme Priority</h1>
                <p className="text-lg text-teal-100 max-w-2xl mx-auto mb-8">Book instant physical or virtual appointments with premium verified healthcare specialists today.</p>
                <button onClick={() => navigate('/appointments')} className="bg-white text-teal-800 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-teal-50 transition transform hover:scale-105">Find Doctors Now</button>
            </section>

            {/* Top Rated Doctors Section */}
            <section className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Top Rated Specialists</h2>
                <div className="w-24 h-1 bg-teal-600 mx-auto mb-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {doctors.map(doc => (
                        <div key={doc._id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-xl transition">
                            <img src={doc.image} alt={doc.name} className="h-56 w-full object-cover" />
                            <div className="p-5 flex flex-col flex-grow">
                                <span className="bg-teal-50 text-teal-700 text-xs font-bold px-2.5 py-1 rounded-full w-max mb-2">{doc.specialty}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{doc.name}</h3>
                                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm font-semibold">{doc.rating || '5.0'}</span>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-lg font-bold text-teal-700">৳ {doc.fee}</span>
                                    <button onClick={() => handleViewDetails(doc._id)} className="bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold px-4 py-2 rounded transition">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Additional Info Section 1: Features */}
            <section className="bg-teal-50 py-12 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book With DocAppoint?</h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <ShieldCheck className="text-teal-600 w-6 h-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900">100% Certified Professionals</h4>
                                    <p className="text-sm text-gray-600">All medical operators pass deep identity and license background checks.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Clock className="text-teal-600 w-6 h-6 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900">Zero Wait Time Guarantees</h4>
                                    <p className="text-sm text-gray-600">Get checked into your diagnostic exact room precisely inside your timeline booking window.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600" alt="medical clinic" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;