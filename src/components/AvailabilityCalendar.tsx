import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useRealtimeBookings } from '@/hooks/useBookings';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit } from '@/lib/supabase';
import dayjs from 'dayjs';

interface AvailabilityCalendarProps {
  unit: Unit;
  selectedDate?: Date;
  onDateSelect?: (date: Date | undefined) => void;
  selectedEndDate?: Date;
  onEndDateSelect?: (date: Date | undefined) => void;
  className?: string;
  mode?: 'single' | 'range';
}

const AvailabilityCalendar = ({ 
  unit, 
  selectedDate, 
  onDateSelect,
  selectedEndDate,
  onEndDateSelect,
  className 
  mode = 'single'
}: AvailabilityCalendarProps) => {
  const { t } = useTranslation();
  const { data: bookings, loading, error, isDateAvailable } = useRealtimeBookings(unit.id);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  useEffect(() => {
    if (!loading && bookings.length > 0) {
      // Generate all booked dates for the next 6 months
      const blockedDates: Date[] = [];
      const today = new Date();
      const sixMonthsLater = new Date();
      sixMonthsLater.setMonth(today.getMonth() + 6);
      
      // For each day in the next 6 months, check if it's available
      for (let day = new Date(today); day <= sixMonthsLater; day.setDate(day.getDate() + 1)) {
        if (!isDateAvailable(new Date(day), unit.id)) {
          blockedDates.push(new Date(day));
        }
      }
      
      setDisabledDates(blockedDates);
    }
  }, [bookings, loading, unit.id, isDateAvailable]);

  const isDateUnavailable = (date: Date) => {
    return disabledDates.some(disabledDate => 
      dayjs(date).format('YYYY-MM-DD') === dayjs(disabledDate).format('YYYY-MM-DD')
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (mode === 'range') {
      if (!selectedDate || (selectedDate && selectedEndDate)) {
        // Start new selection
        onDateSelect?.(date);
        onEndDateSelect?.(undefined);
      } else if (selectedDate && !selectedEndDate) {
        // Select end date
        if (date && date > selectedDate) {
          onEndDateSelect?.(date);
        } else {
          // If selected date is before start date, make it the new start date
          onDateSelect?.(date);
          onEndDateSelect?.(undefined);
        }
      }
    } else {
      onDateSelect?.(date);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[350px]">
        <div className="animate-pulse text-[#0077B6]">Loading availability...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[350px]">
        <div className="text-red-500">Error loading availability</div>
      </div>
    );
  }

  return (
    <div className={cn("mt-4", className)}>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={[
          { before: new Date() },
          (date) => isDateUnavailable(date)
        ]}
        className={cn("rounded-md p-3 pointer-events-auto")}
        modifiers={{
          booked: disabledDates,
          selected_range: selectedDate && selectedEndDate ? 
            Array.from({ length: dayjs(selectedEndDate).diff(selectedDate, 'day') + 1 }, (_, i) => 
              dayjs(selectedDate).add(i, 'day').toDate()
            ) : []
        }}
        modifiersClassNames={{
          booked: "bg-red-100 text-red-600 opacity-70",
          selected_range: "bg-blue-100 text-blue-800"
        }}
        footer={
          <div className="pt-4 flex items-center text-xs">
            <div className="h-3 w-3 rounded-full bg-red-100 mr-2"></div>
            <span className="text-[#20425C]">Booked</span>
            {mode === 'range' && (
              <>
                <div className="h-3 w-3 rounded-full bg-blue-100 mr-2 ml-4"></div>
                <span className="text-[#20425C]">Selected dates</span>
              </>
            )}
          </div>
        }
      />
    </div>
  );
};

export default AvailabilityCalendar;