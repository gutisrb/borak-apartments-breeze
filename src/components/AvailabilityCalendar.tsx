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
  className?: string;
}

const AvailabilityCalendar = ({ 
  unit, 
  selectedDate, 
  onDateSelect,
  className 
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[350px]">
        <div className="animate-pulse text-[#0077B6]">{t('availability.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[350px]">
        <div className="text-red-500">{t('availability.error')}</div>
      </div>
    );
  }

  return (
    <div className={cn("mt-4", className)}>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        disabled={[
          { before: new Date() },
          (date) => isDateUnavailable(date)
        ]}
        className={cn("rounded-md p-3 pointer-events-auto")}
        modifiers={{
          booked: disabledDates
        }}
        modifiersClassNames={{
          booked: "bg-red-100 text-red-600 opacity-70"
        }}
        footer={
          <div className="pt-4 flex items-center text-xs">
            <div className="h-3 w-3 rounded-full bg-red-100 mr-2"></div>
            <span className="text-[#20425C]">{t('availability.booked')}</span>
          </div>
        }
      />
    </div>
  );
};

export default AvailabilityCalendar;