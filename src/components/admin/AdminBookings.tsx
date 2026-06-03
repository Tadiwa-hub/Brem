import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';
import { Check, X, Phone, User, Calendar, MessageSquare } from 'lucide-react';

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        headers: { 'Authorization': token || '' }
      });
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string, name: string, date: string, type: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({ status })
      });
      
      if (response.ok) {
        fetchBookings();
        
        // Prepare WhatsApp message
        let message = "";
        if (status === 'confirmed') {
          message = `Hi ${name}! Your ${type} booking at Brem Magnified Homes on ${date} has been confirmed. We look forward to hosting you!`;
        } else if (status === 'cancelled') {
          message = `Hi ${name}, unfortunately we are unable to accommodate your booking on ${date}. Please contact us to reschedule.`;
        }

        if (message) {
          const booking = bookings.find(b => b.id === id);
          const encodedMessage = encodeURIComponent(message);
          window.open(`https://wa.me/${booking.client_phone.replace('+', '')}?text=${encodedMessage}`, '_blank');
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getStatusPill = (status: string) => {
    switch (status) {
      case 'pending': return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase">Pending</span>;
      case 'confirmed': return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Confirmed</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase">Cancelled</span>;
      default: return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface text-gray-500 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8">Loading bookings...</td></tr>
            ) : bookings.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8">No bookings found</td></tr>
            ) : (
              bookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  <tr 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors ${expandedId === booking.id ? 'bg-gray-50' : ''}`}
                    onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
                  >
                    <td className="px-6 py-4 font-medium text-primary">{booking.client_name}</td>
                    <td className="px-6 py-4 text-sm">{format(new Date(booking.preferred_date), 'MMM dd, yyyy')}</td>
                    <td className="px-6 py-4 text-sm">{booking.stay_type.split(' ')[0]}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{booking.client_phone}</td>
                    <td className="px-6 py-4">{getStatusPill(booking.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'confirmed', booking.client_name, booking.preferred_date, booking.stay_type)}
                          className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded transition-all"
                          title="Confirm"
                        >
                          <Check size={18} />
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'cancelled', booking.client_name, booking.preferred_date, booking.stay_type)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded transition-all"
                          title="Cancel"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === booking.id && (
                    <tr>
                      <td colSpan={6} className="px-6 py-6 bg-gray-50 border-t border-gray-100">
                        <div className="grid md:grid-cols-3 gap-8">
                          <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase text-gray-400">Client Info</h4>
                            <p className="flex items-center text-sm"><User size={14} className="mr-2 text-gray-400" /> {booking.client_name}</p>
                            <p className="flex items-center text-sm"><Phone size={14} className="mr-2 text-gray-400" /> {booking.client_phone}</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase text-gray-400">Stay Details</h4>
                            <p className="flex items-center text-sm"><Calendar size={14} className="mr-2 text-gray-400" /> {booking.preferred_date}</p>
                            <p className="flex items-center text-sm font-medium text-accent">{booking.stay_type}</p>
                            <p className="text-sm">Guests: {booking.num_guests}</p>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-bold text-xs uppercase text-gray-400">Requests</h4>
                            <p className="text-sm italic text-gray-600 flex items-start">
                              <MessageSquare size={14} className="mr-2 mt-1 text-gray-400 flex-shrink-0" />
                              {booking.special_requests || "No special requests"}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
