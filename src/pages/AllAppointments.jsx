import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Search } from 'lucide-react';

const AllAppointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('low-to-high');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/doctors?search=${search}`)
            .then(res => res.json())
            .then(data => {
                // সর্টিং রুলস
                const sorted = [...data].sort((a, b) => {
                    return sort === 'low-to-high' ? a.fee - b.fee : b.fee - a.fee;
                });
                setDoctors(sorted);
            })
            .catch(() => {
                // Fallback static static listing
                const mock = [
                    { _id: "d1", name: "Dr. Ayesha Rahman", specialty: "Cardiologist", fee: 800, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400" },
                    { _id: "d2", name: "Dr. Asif Chowdhury", specialty: "Neurologist", fee: 1000, image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400" },
                    { _id: "d3", name: "Dr. Sadiya Afrin", specialty: "Pediatrician", fee: 700, image: "https://images.unsplash.com/photo-1594824813573-246434e33963?q=80&w=400" }
                ];
                setDoctors(mock);
            });
    }, [search, sort]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Available Appointment Schedules</h2>
            
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8 bg-white p-4 rounded-xl shadow-sm">
                <div className="relative w-full md:w-92">
                    <input 
                        type="text" 
                        placeholder="Search by doctor name..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-teal-600 text-sm"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <span className="text-sm text-gray-600 whitespace-nowrap">Sort By Fee:</span>
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className="border rounded-lg p-2 text-sm focus:outline-teal-600 bg-white">
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {doctors.map(doc => (
                    <div key={doc._id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border h-full">
                        <img src={doc.image} alt={doc.name} className="h-48 w-full object-cover" />
                        <div className="p-4 flex flex-col flex-grow">
                            <span className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-1">{doc.specialty}</span>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">{doc.name}</h3>
                            <div className="mt-auto pt-4 border-t flex justify-between items-center">
                                <span className="font-bold text-teal-700 text-md">৳ {doc.fee}</span>
                                <button 
                                    onClick={() => user ? navigate(`/doctors/${doc._id}`) : navigate('/login')}
                                    className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-4 py-2 rounded transition"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllAppointments;