import { useState, useEffect } from 'react';
import { Users, Clock, CalendarCheck, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminStats = () => {
  const [stats, setStats] = useState({
    bookingsThisWeek: 0,
    pendingConfirmations: 0,
    bookedDaysThisMonth: 0,
    revenueThisMonth: 0
  });
  const { token } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/bookings', {
        headers: { 'Authorization': token || '' }
      });
      const bookings = await response.json();

      // Simple calculation for stats
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const thisWeek = bookings.filter((b: any) => new Date(b.created_at) >= oneWeekAgo);
      const pending = bookings.filter((b: any) => b.status === 'pending');
      const confirmed = bookings.filter((b: any) => b.status === 'confirmed');
      
      const revenue = confirmed.reduce((acc: number, b: any) => {
        return acc + (b.stay_type.includes('Night') ? 50 : 25);
      }, 0);

      setStats({
        bookingsThisWeek: thisWeek.length,
        pendingConfirmations: pending.length,
        bookedDaysThisMonth: confirmed.length, // approximation
        revenueThisMonth: revenue
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const statCards = [
    { label: 'Bookings This Week', value: stats.bookingsThisWeek, icon: <Users className="text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Pending Confirm.', value: stats.pendingConfirmations, icon: <Clock className="text-amber-500" />, color: 'bg-amber-50' },
    { label: 'Booked Days (Month)', value: stats.bookedDaysThisMonth, icon: <CalendarCheck className="text-green-500" />, color: 'bg-green-50' },
    { label: 'Revenue (Confirmed)', value: `$${stats.revenueThisMonth}`, icon: <DollarSign className="text-accent" />, color: 'bg-gold/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-4 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-primary mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-surface hover:bg-gray-100 rounded-lg text-left transition-all">
              <p className="font-bold text-primary">New Booking</p>
              <p className="text-xs text-gray-500">Manual entry</p>
            </button>
            <button className="p-4 bg-surface hover:bg-gray-100 rounded-lg text-left transition-all">
              <p className="font-bold text-primary">Block Dates</p>
              <p className="text-xs text-gray-500">Holiday/Maintenance</p>
            </button>
          </div>
        </div>
        
        <div className="bg-primary text-white p-8 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold text-accent mb-2">Monthly Target</h3>
          <p className="text-3xl font-bold mb-4">$2,500.00</p>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-accent h-full rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min((stats.revenueThisMonth / 2500) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {Math.round((stats.revenueThisMonth / 2500) * 100)}% of monthly goal reached
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
