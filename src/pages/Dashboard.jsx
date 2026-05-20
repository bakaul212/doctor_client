import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Edit2, Trash2 } from 'lucide-react';

const Dashboard = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [editBooking, setEditBooking] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: user?.name || '', photoURL: user?.photoURL || '' });

    useEffect(() => {
        if(user?.email) {
            fetch(`http://localhost:5000/my-appointments?email=${user.email}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('docToken')}` }
            })
            .then(res => res.json())
            .then(data => setAppointments(data))
            .catch(() => {
                // If API offline static fallback container
                setAppointments([]);
            });
        }
    }, [user]);

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to cancel this appointment?")) {
            fetch(`http://localhost:5000/appointments/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('docToken')}` }
            })
            .then(() => {
                setAppointments(appointments.filter(app => app._id !== id));
                alert("Appointment deleted successfully!");
            });
        }
    };

    const handleUpdateSave = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/appointments/${editBooking._id}`, {
            method: 'PUT',
            headers: { 
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('docToken')}`
            },
            body: JSON.stringify(editBooking)
        })
        .then(() => {
            setAppointments(appointments.map(a => a._id === editBooking._id ? editBooking : a));
            alert("Appointment updated successfully!");
            setEditBooking(null);
        });
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(profileForm.name, profileForm.photoURL);
        alert("Profile updated successfully!");
        setShowProfileModal(false);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Profile Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border text-center h-fit">
                <img src={user?.photoURL} alt="User Avatar" className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-teal-600 mb-4"/>
                <h3 className="font-bold text-xl text-gray-900">{user?.name}</h3>
                <p className="text-gray-500 text-xs mb-4">{user?.email}</p>
                <button onClick={() => setShowProfileModal(true)} className="w-full bg-teal-700 text-white text-xs font-bold py-2 rounded hover:bg-teal-800">Update Profile</button>
            </div>

            {/* Bookings Display Dashboard Component */}
            <div className="md:col-span-3">
                <h2 className="text-2xl font-bold mb-4">My Booked Appointments</h2>
                {appointments.length === 0 ? (
                    <p className="text-gray-500 text-sm">No recorded schedule schedules booked yet.</p>
                ) : (
                    <div className="space-y-4">
                        {appointments.map(app => (
                            <div key={app._id} className="bg-white border rounded-xl p-4 shadow-sm flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-md">{app.doctorName}</h4>
                                    <p className="text-xs text-gray-600">Patient: {app.patientName} ({app.gender})</p>
                                    <p className="text-xs font-semibold text-teal-700 mt-1">{app.appointmentDate} | {app.appointmentTime}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={() => setEditBooking(app)} className="p-2 border rounded hover:bg-gray-50 text-blue-600"><Edit2 className="w-4 h-4"/></button>
                                    <button onClick={() => handleDelete(app._id)} className="p-2 border rounded hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Appointment Modal */}
            {editBooking && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
                    <form onSubmit={handleUpdateSave} className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
                        <h3 className="font-bold text-lg">Update Booking Details</h3>
                        <p className="text-xs text-gray-500">Doctor Info and your account Email are read-only.</p>
                        <div>
                            <label className="text-xs font-bold block mb-1">Patient Name</label>
                            <input type="text" value={editBooking.patientName} onChange={(e)=>setEditBooking({...editBooking, patientName:e.target.value})} className="w-full border p-2 text-sm rounded"/>
                        </div>
                        <div>
                            <label className="text-xs font-bold block mb-1">Appointment Date</label>
                            <input type="date" value={editBooking.appointmentDate} onChange={(e)=>setEditBooking({...editBooking, appointmentDate:e.target.value})} className="w-full border p-2 text-sm rounded"/>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={()=>setEditBooking(null)} className="px-4 py-2 border rounded text-xs">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-teal-700 text-white rounded text-xs">Save Changes</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Profile Update Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
                    <form onSubmit={handleProfileSubmit} className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
                        <h3 className="font-bold text-lg">Update Profile Fields</h3>
                        <div>
                            <label className="text-xs font-bold block mb-1">Name</label>
                            <input type="text" value={profileForm.name} onChange={(e)=>setProfileForm({...profileForm, name:e.target.value})} className="w-full border p-2 text-sm rounded"/>
                        </div>
                        <div>
                            <label className="text-xs font-bold block mb-1">Photo URL</label>
                            <input type="url" value={profileForm.photoURL} onChange={(e)=>setProfileForm({...profileForm, photoURL:e.target.value})} className="w-full border p-2 text-sm rounded"/>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={()=>setShowProfileModal(false)} className="px-4 py-2 border rounded text-xs">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-teal-700 text-white rounded text-xs">Update Profile</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Dashboard;