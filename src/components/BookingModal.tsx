import React, { useState } from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';

interface BookingModalProps {
  date: Date;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ date, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    stayType: 'Night Stay $50 (10am to 10am)',
    guests: '1',
    requests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      client_name: formData.name,
      client_phone: formData.phone,
      stay_type: formData.stayType,
      preferred_date: format(date, 'yyyy-MM-dd'),
      num_guests: parseInt(formData.guests),
      special_requests: formData.requests
    };

    // Save to database
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
    } catch (error) {
      console.error('Failed to save booking to database:', error);
    }

    // WhatsApp Redirect
    const whatsappNumber = '263782490456';
    const message = `Hello Brem Magnified Homes! I would like to book a ${formData.stayType} on ${format(date, 'PPP')}.
Name: ${formData.name}
Phone: ${formData.phone}
Guests: ${formData.guests}
Special requests: ${formData.requests || 'None'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-slide-up">
        <div className="flex justify-between items-center px-6 py-4 bg-primary text-white">
          <h3 className="text-xl font-bold font-heading">Book for {format(date, 'MMMM do')}</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
            <input 
              required
              type="tel" 
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="e.g. +263..."
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Stay Type</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              value={formData.stayType}
              onChange={(e) => setFormData({...formData, stayType: e.target.value})}
            >
              <option>Night Stay $50 (10am to 10am)</option>
              <option>Day Rest $25 (4 hours)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Number of Guests</label>
            <input 
              type="number" 
              min="1"
              max="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              value={formData.guests}
              onChange={(e) => setFormData({...formData, guests: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Special Requests (Optional)</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
              placeholder="Any specific requirements?"
              value={formData.requests}
              onChange={(e) => setFormData({...formData, requests: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-accent text-white font-bold py-3 rounded-sm shadow-lg hover:bg-opacity-90 transition-all mt-6"
          >
            Confirm & Send Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
