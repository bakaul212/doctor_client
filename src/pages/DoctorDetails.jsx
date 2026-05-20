import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MapPin, Building, Calendar } from 'lucide-react';

const DoctorDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        patientName: user?.name || '',
        gender: 'Male',
        phone: '',
        appointmentDate: '',
        appointmentTime: ''
    });

    useEffect(() => {
        fetch(`http://localhost:5000/doctors/${id}`)
            .then(res => res.json())
            .then(data => setDoctor(data))
            .catch(() => {
                // Static Default Fallback if DB is off
                setDoctor({
                    name: "Dr. Ayesha Rahman",
                    specialty: "Cardiologist",
                    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400",
                    experience: "10 years",
                    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
                    description: "Highly experienced cardiologist specializing in heart diseases.",
                    hospital: "Labaid Cardiac Hospital",
                    location: "Dhanmondi, Dhaka",
                    fee: 800
                });
            });
    }, [id]);

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        const payload = {
            userEmail: user.email,
            doctorName: doctor.name,
            ...formData
        };

        fetch('http://localhost:5000/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('docToken')}`
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(() => {
            alert("Appointment booked successfully! 🎉");
            setShowModal(false);
            navigate('/dashboard');
        });
    };

    if (!doctor) return <div className="text-center py-20">Loading Doctor Profile...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8 flex flex-col md:flex-row gap-8">
                <img src={doctor.image} alt={doctor.name} className="w-full md:w-64 h-64 rounded-xl object-cover" />
                <div className="flex-grow">
                    <span className="bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded mb-2 inline-block">{doctor.specialty}</span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h2>
                    <p className="text-gray-600 text-sm mb-4">{doctor.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-700 mb-6">
                        <div className="flex items-center space-x-2"><Building className="w-4 h-4 text-teal-600" /> <span>{doctor.hospital}</span></div>
                        <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-teal-600" /> <span>{doctor.location}</span></div>
                        <div className="flex items-center space-x-2"><Calendar className="w-4 h-4 text-teal-600" /> <span>Experience: {doctor.experience}</span></div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-2xl font-bold text-teal-700">৳ {doctor.fee}</span>
                        <button onClick={() => setShowModal(true)} className="bg-teal-700 hover:bg-teal-800 text-white font-bold px-6 py-2.5 rounded-lg transition">Book Appointment</button>
                    </div>
                </div>
            </div>

            {/* Appointment Booking Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Appointment Form</h3>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-600 block mb-1">Patient Full Name</label>
                                <input type="text" required value={formData.patientName} onChange={(e)=>setFormData({...formData, patientName: e.target.value})} className="w-full border p-2 text-sm rounded focus:outline-teal-600"/>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1">Gender</label>
                                    <select value={formData.gender} onChange={(e)=>setFormData({...formData, gender: e.target.value})} className="w-full border p-2 text-sm rounded">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1">Contact Phone</label>
                                    <input type="tel" required value={formData.phone} onChange={(e)=>setFormData({...formData, phone: e.target.value})} className="w-full border p-2 text-sm rounded"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1">Preferred Date</label>
                                    <input type="date" required value={formData.appointmentDate} onChange={(e)=>setFormData({...formData, appointmentDate: e.target.value})} className="w-full border p-2 text-sm rounded"/>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 block mb-1">Available Slot</label>
                                    <select value={formData.appointmentTime} onChange={(e)=>setFormData({...formData, appointmentTime: e.target.value})} className="w-full border p-2 text-sm rounded" required>
                                        <option value="">Select slot</option>
                                        {doctor.availability?.map((slot,i)=><option key={i} value={slot}>{slot}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 pt-4 border-t">
                                <button type="button" onClick={()=>setShowModal(false)} className="px-4 py-2 border rounded text-sm hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-teal-700 text-white font-semibold rounded text-sm hover:bg-teal-800">Submit Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDetails;