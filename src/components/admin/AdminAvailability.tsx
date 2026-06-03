import { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, Check, X, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminAvailability = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<Record<string, any>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bulkData, setBulkData] = useState({
    from: '',
    to: '',
    status: 'fully_booked'
  });
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchAvailability();
  }, [currentMonth]);

  const fetchAvailability = async () => {
    try {
      const monthStr = format(currentMonth, 'yyyy-MM');
      const response = await fetch(`/api/availability?month=${monthStr}`);
      const data = await response.json();
      const lookup: Record<string, any> = {};
      data.forEach((item: any) => {
        lookup[item.date] = item;
      });
      setAvailability(lookup);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  const updateStatus = async (date: string, status: string) => {
    try {
      const response = await fetch('/api/availability', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({ date, status })
      });
      if (response.ok) {
        fetchAvailability();
        setSelectedDate(null);
      }
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const handleBulkUpdate = async () => {
    if (!bulkData.from || !bulkData.to) {
      alert("Please select both From and To dates");
      return;
    }

    setIsBulkLoading(true);
    try {
      const start = parseISO(bulkData.from);
      const end = parseISO(bulkData.to);
      const days = eachDayOfInterval({ start, end });

      // Update each date sequentially (or use a bulk API if available, but here we reuse updateStatus logic)
      // For performance in Cloudflare, we'll just loop for now as D1 is fast
      for (const day of days) {
        const dateStr = format(day, 'yyyy-MM-dd');
        await fetch('/api/availability', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token || ''
          },
          body: JSON.stringify({ date: dateStr, status: bulkData.status })
        });
      }
      
      fetchAvailability();
      alert("Bulk update successful!");
      setBulkData({ from: '', to: '', status: 'fully_booked' });
    } catch (error) {
      console.error('Bulk update failed:', error);
      alert("Bulk update failed. Check console for details.");
    } finally {
      setIsBulkLoading(false);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-primary font-heading">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex items-center space-x-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center py-4 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map((day, i) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const data = availability[dateStr];
          const status = data?.status || 'available';
          const isCurrentMonth = isSameMonth(day, monthStart);
          
          return (
            <div 
              key={i}
              onClick={() => isCurrentMonth && setSelectedDate(dateStr)}
              className={`
                relative h-24 border-r border-b border-gray-50 p-2 transition-all cursor-pointer
                ${!isCurrentMonth ? 'bg-gray-50 text-gray-300' : 'bg-white hover:bg-gray-50'}
                ${selectedDate === dateStr ? 'ring-2 ring-accent ring-inset z-10' : ''}
              `}
            >
              <span className="text-sm font-semibold">{format(day, 'd')}</span>
              <div className="mt-2">
                {isCurrentMonth && (
                  <div className={`
                    text-[10px] font-bold uppercase px-2 py-0.5 rounded-full inline-block
                    ${status === 'available' ? 'bg-green-100 text-green-700' : ''}
                    ${status === 'fully_booked' ? 'bg-red-100 text-red-700' : ''}
                    ${status === 'on_request' ? 'bg-amber-100 text-amber-700' : ''}
                  `}>
                    {status.replace('_', ' ')}
                  </div>
                )}
              </div>

              {selectedDate === dateStr && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-2xl border border-gray-200 rounded-lg p-3 z-50 animate-fade-in">
                  <p className="text-xs font-bold text-gray-500 mb-3 border-b pb-2">{format(day, 'MMM do, yyyy')}</p>
                  <div className="space-y-1">
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateStatus(dateStr, 'available'); }}
                      className="w-full flex items-center space-x-2 p-2 hover:bg-green-50 rounded text-sm text-green-700"
                    >
                      <Check size={14} /> <span>Available</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateStatus(dateStr, 'fully_booked'); }}
                      className="w-full flex items-center space-x-2 p-2 hover:bg-red-50 rounded text-sm text-red-700"
                    >
                      <X size={14} /> <span>Fully Booked</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); updateStatus(dateStr, 'on_request'); }}
                      className="w-full flex items-center space-x-2 p-2 hover:bg-amber-50 rounded text-sm text-amber-700"
                    >
                      <HelpCircle size={14} /> <span>On Request</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-surface border-t border-gray-100">
        <h4 className="font-bold text-primary mb-4">Bulk Update</h4>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">From</label>
            <input 
              type="date" 
              className="p-2 border border-gray-300 rounded text-sm" 
              value={bulkData.from}
              onChange={(e) => setBulkData({...bulkData, from: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">To</label>
            <input 
              type="date" 
              className="p-2 border border-gray-300 rounded text-sm" 
              value={bulkData.to}
              onChange={(e) => setBulkData({...bulkData, to: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Mark As</label>
            <select 
              className="p-2 border border-gray-300 rounded text-sm"
              value={bulkData.status}
              onChange={(e) => setBulkData({...bulkData, status: e.target.value})}
            >
              <option value="fully_booked">Fully Booked</option>
              <option value="on_request">On Request</option>
              <option value="available">Available</option>
            </select>
          </div>
          <button 
            onClick={handleBulkUpdate}
            disabled={isBulkLoading}
            className="bg-primary text-white px-6 py-2 rounded text-sm font-bold hover:bg-opacity-90 disabled:opacity-50 flex items-center"
          >
            {isBulkLoading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            ) : null}
            Block These Dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAvailability;
