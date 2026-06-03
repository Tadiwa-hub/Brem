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
      <div className="grid grid-cols-7">
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
                relative h-24 md:h-32 border-r border-b border-gray-100 flex flex-col p-2 transition-all
                ${!isCurrentMonth ? 'bg-gray-50 text-gray-300' : 'bg-white cursor-pointer'}
                ${isBooked && isCurrentMonth ? 'bg-red-50 cursor-not-allowed' : ''}
                ${isOnRequest && isCurrentMonth ? 'bg-amber-50' : ''}
                ${!isBooked && isCurrentMonth ? 'hover:bg-accent/5' : ''}
              `}
            >
              <span className={`text-sm font-semibold ${isSameDay(day, today) ? 'bg-accent text-white w-6 h-6 flex items-center justify-center rounded-full' : ''}`}>
                {format(day, 'd')}
              </span>
              
              <div className="mt-auto flex flex-col items-center">
                {isCurrentMonth && (
                  <>
                    {isBooked ? (
                      <span className="text-[10px] md:text-xs text-red-600 font-bold uppercase line-through">Booked</span>
                    ) : isOnRequest ? (
                      <span className="text-[10px] md:text-xs text-amber-600 font-bold uppercase">On Request</span>
                    ) : (
                      <span className="text-[10px] md:text-xs text-green-600 font-bold uppercase">Available</span>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="availability" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Check Availability</h2>
          <div className="flex justify-center items-center space-x-6 mb-8 text-sm font-medium">
            <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2" /> Available</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2" /> Fully Booked</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-amber-500 rounded-full mr-2" /> On Request</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {renderHeader()}
          {renderDays()}
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </div>
          ) : (
            renderCells()
          )}
        </div>

        <div className="mt-12 text-center text-gray-500 italic">
          * Prices: Day Rest $25 (4 hours) | Night Stay $50 (10am to 10am)
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
