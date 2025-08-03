import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useRealtimeBookings } from '@/hooks/useBookings';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
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
  className,
  mode = 'single'
}: AvailabilityCalendarProps) => {
  const { t } = useTranslation();
  const { data: bookings, loading, error, isDateAvailable } = useRealtimeBookings(unit.id);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (!loading && bookings) {
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
          // Auto-advance to next month if needed
          if (date.getMonth() > currentMonth.getMonth()) {
            setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
          }
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

  const handleClearSelection = () => {
    onDateSelect?.(undefined);
    onEndDateSelect?.(undefined);
  };

  const handleMonthChange = (month: Date) => {
    setIsNavigating(true);
    setCurrentMonth(month);
    setTimeout(() => setIsNavigating(false), 200);
  };

  const getDateRangeArray = () => {
    if (!selectedDate || !selectedEndDate) return [];
    const start = selectedDate;
    const end = selectedEndDate;
    const dates = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
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
    <div className={cn("mt-4 relative", className)}>
      {/* Header with clear selection */}
      {(selectedDate || selectedEndDate) && (
        <div className="flex items-center justify-between mb-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {mode === 'range' ? 
                `${selectedDate ? dayjs(selectedDate).format('MMM DD') : 'Check-in'} - ${selectedEndDate ? dayjs(selectedEndDate).format('MMM DD') : 'Check-out'}` :
                selectedDate ? dayjs(selectedDate).format('MMM DD, YYYY') : ''
              }
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSelection}
            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Calendar container with transition */}
      <div className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200",
        isNavigating && "opacity-75"
      )}>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          month={currentMonth}
          onMonthChange={handleMonthChange}
          disabled={[
            { before: new Date() },
            (date) => isDateUnavailable(date)
          ]}
          className={cn("p-4 pointer-events-auto w-full")}
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center mb-4",
            caption_label: "text-lg font-semibold text-foreground",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              "h-9 w-9 bg-transparent p-0 opacity-70 hover:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-all duration-200 border border-transparent hover:border-border"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex mb-2",
            head_cell: "text-muted-foreground rounded-md w-10 font-medium text-sm text-center",
            row: "flex w-full mt-1",
            cell: cn(
              "relative h-10 w-10 text-center text-sm p-0 focus-within:relative focus-within:z-20",
              "[&:has([aria-selected])]:bg-accent/50 [&:has([aria-selected].day-outside)]:bg-accent/30",
              "[&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            ),
            day: cn(
              "h-10 w-10 p-0 font-normal aria-selected:opacity-100 rounded-md transition-all duration-200",
              "hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:shadow-sm",
              "focus:bg-accent focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-30"
            ),
            day_range_end: "day-range-end",
            day_selected: cn(
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              "focus:bg-primary focus:text-primary-foreground shadow-md scale-105"
            ),
            day_today: "bg-accent text-accent-foreground font-semibold border border-primary/20",
            day_outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
          modifiers={{
            booked: disabledDates,
            selected_range: getDateRangeArray(),
            range_start: selectedDate ? [selectedDate] : [],
            range_end: selectedEndDate ? [selectedEndDate] : [],
            range_middle: selectedDate && selectedEndDate ? 
              getDateRangeArray().slice(1, -1) : []
          }}
          modifiersClassNames={{
            booked: cn(
              "bg-destructive/10 text-destructive hover:bg-destructive/20",
              "cursor-not-allowed relative",
              "before:absolute before:inset-0 before:bg-destructive/5 before:rounded-md"
            ),
            selected_range: cn(
              "bg-primary/15 text-primary hover:bg-primary/25",
              "transition-colors duration-200"
            ),
            range_start: cn(
              "bg-primary text-primary-foreground rounded-l-md",
              "hover:bg-primary/90 shadow-md scale-105"
            ),
            range_end: cn(
              "bg-primary text-primary-foreground rounded-r-md",
              "hover:bg-primary/90 shadow-md scale-105"
            ),
            range_middle: cn(
              "bg-primary/15 text-primary rounded-none",
              "hover:bg-primary/25"
            )
          }}
          components={{
            IconLeft: ({ ...props }) => <ChevronLeft className="h-5 w-5" {...props} />,
            IconRight: ({ ...props }) => <ChevronRight className="h-5 w-5" {...props} />,
          }}
        />

        {/* Enhanced Footer */}
        <div className="px-4 pb-4 border-t border-border bg-muted/30">
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary shadow-sm"></div>
              <span className="text-foreground font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60 shadow-sm"></div>
              <span className="text-foreground font-medium">Booked</span>
            </div>
            {mode === 'range' && (selectedDate || selectedEndDate) && (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary/30 shadow-sm"></div>
                <span className="text-foreground font-medium">Selected Range</span>
              </div>
            )}
          </div>
          
          {mode === 'range' && (
            <div className="mt-3 text-xs text-muted-foreground">
              {!selectedDate ? 
                "Select your check-in date" : 
                !selectedEndDate ? 
                "Select your check-out date" : 
                `${dayjs(selectedEndDate).diff(selectedDate, 'day')} nights selected`
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;