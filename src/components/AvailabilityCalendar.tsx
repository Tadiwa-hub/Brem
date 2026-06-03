import { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval,
  isBefore,
  startOfToday
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookingModal from './BookingModal';

interface AvailabilityData {
  date: string;
  status: 'available' | 'fully_booked' | 'on_request';
}

const AvailabilityCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availability, setAvailability] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailability();
  }, [currentMonth]);

  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const monthStr = format(currentMonth, 'yyyy-MM');
      const response = await fetch(`/api/availability?month=${monthStr}`);
      const data: AvailabilityData[] = await response.json();
      
      const lookup: Record<string, string> = {};
      data.forEach(item => {
        lookup[item.date] = item.status;
      });
      setAvailability(lookup);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const onDateClick = (day: Date) => {
    const status = availability[format(day, 'yyyy-MM-dd')] || 'available';
    if (status === 'fully_booked') return;
    
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-6 bg-primary text-white rounded-t-lg">
        <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft />
        </button>
        <h3 className="text-2xl font-bold font-heading">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronRight />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 border-b border-gray-200">
        {days.map((day, i) => (
          <div key={i} className="py-4 text-center text-sm font-bold text-gray-500 uppercase tracking-wide">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const today = startOfToday();

    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="grid grid-cols-7 min-w-[700px] md:min-w-0">
        {calendarDays.map((day, i) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const status = availability[dateStr] || 'available';
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isPast = isBefore(day, today);
          const isBooked = status === 'fully_booked' || isPast;
          const isOnRequest = status === 'on_request';
          
          return (
            <div
              key={i}
              onClick={() => isCurrentMonth && !isBooked && onDateClick(day)}
              className={`
                relative h-24 md:h-32 border-r border-b border-gray-100 flex flex-col p-2 transition-all duration-300
                ${!isCurrentMonth ? 'bg-gray-50 text-gray-300' : 'bg-white cursor-pointer'}
                ${isBooked && isCurrentMonth ? 'bg-red-50/30 cursor-not-allowed' : ''}
                ${isOnRequest && isCurrentMonth ? 'bg-amber-50/50' : ''}
                ${!isBooked && isCurrentMonth ? 'hover:bg-accent/5 hover:scale-[1.02] hover:z-10 hover:shadow-sm' : ''}
              `}
            >
              <span className={`text-xs md:text-sm font-semibold ${isSameDay(day, today) ? 'bg-accent text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md' : ''}`}>
                {format(day, 'd')}
              </span>
              
              <div className="mt-auto flex flex-col items-center pb-2">
                {isCurrentMonth && (
                  <div className={`
                    text-[9px] md:text-xs font-bold uppercase tracking-tighter md:tracking-normal px-1.5 py-0.5 rounded
                    ${isBooked ? 'text-red-500 bg-red-100/50' : isOnRequest ? 'text-amber-600 bg-amber-100/50' : 'text-green-600 bg-green-100/50'}
                  `}>
                    {isBooked ? 'Booked' : isOnRequest ? 'Request' : 'Available'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="availability" className="py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Check Availability</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-4 text-[10px] md:text-sm font-bold uppercase tracking-widest text-gray-500">
            <div className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-2 shadow-sm" /> Available</div>
            <div className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full mr-2 shadow-sm" /> Fully Booked</div>
            <div className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 bg-amber-500 rounded-full mr-2 shadow-sm" /> On Request</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-500 hover:shadow-accent/10">
          {renderHeader()}
          <div className="overflow-x-auto custom-scrollbar">
            <div className="min-w-[700px] md:min-w-0">
              {renderDays()}
            </div>
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : (
              renderCells()
            )}
          </div>
        </div>
        
        <div className="mt-6 md:hidden text-center text-xs text-gray-400 animate-pulse">
          ← Swipe to see full calendar →
        </div>

        <div className="mt-12 text-center text-gray-400 italic text-sm">
          * Day Rest $25 (4 hours) | Night Stay $50 (10am to 10am)
        </div>
      </div>

      {isModalOpen && selectedDate && (
        <BookingModal 
          date={selectedDate} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
};

export default AvailabilityCalendar;
