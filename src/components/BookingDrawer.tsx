import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit, supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BookingDrawerProps {
  apartment: Unit;
  isOpen: boolean;
  onClose: () => void;
}

const BookingDrawer = ({ apartment, isOpen, onClose }: BookingDrawerProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!checkIn || !checkOut) {
      toast({
        title: t('booking.error'),
        description: t('booking.selectDates'),
        variant: "destructive",
      });
      return;
    }

    if (checkOut <= checkIn) {
      toast({
        title: t('booking.error'),
        description: t('booking.invalidDates'),
        variant: "destructive",
      });
      return;
    }

    if (!name || !email) {
      toast({
        title: t('booking.error'),
        description: t('booking.fillRequired'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          unit_id: apartment.id,
          start_date: format(checkIn, 'yyyy-MM-dd'),
          end_date: format(checkOut, 'yyyy-MM-dd'),
          source: 'website',
          user_id: crypto.randomUUID(),
          channel: 'direct',
          external_uid: `web_${Date.now()}`
        });

      if (error) {
        console.error('Booking error:', error);
        toast({
          title: t('booking.error'),
          description: t('booking.errorDesc'),
          variant: "destructive",
        });
        return;
      }

      setShowSuccess(true);
      
      // Clear form
      setCheckIn(undefined);
      setCheckOut(undefined);
      setAdults('2');
      setChildren('0');
      setName('');
      setEmail('');
      setPhone('');

      // Auto close after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);

      toast({
        title: t('booking.success'),
        description: t('booking.successDesc'),
      });

    } catch (error) {
      console.error('Booking submission error:', error);
      toast({
        title: t('booking.error'),
        description: t('booking.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-16 text-center max-w-lg mx-4 shadow-2xl">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-[#0C1930] mb-6 font-playfair">
            {t('booking.success')}
          </h2>
          <p className="text-[#20425C] font-app text-xl">
            {t('booking.successDesc')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose} modal={true}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg bg-white border-gray-300 overflow-y-auto p-0"
        onPointerDownOutside={(e) => {
          // Allow interactions with calendar and select dropdowns
          const target = e.target as Element;
          if (
            target.closest('[data-radix-popper-content-wrapper]') ||
            target.closest('[data-radix-select-content]') ||
            target.closest('[data-radix-popover-content]') ||
            target.closest('.rdp') ||
            target.closest('[role="dialog"]') ||
            target.closest('[role="listbox"]') ||
            target.closest('[role="option"]') ||
            target.closest('[data-radix-calendar]')
          ) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          // Only close on escape if no popover/select is open
          const openPopover = document.querySelector('[data-state="open"][data-radix-popover-content]');
          const openSelect = document.querySelector('[data-state="open"][data-radix-select-content]');
          if (openPopover || openSelect) {
            e.preventDefault();
          }
        }}
      >
        <div className="relative before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[#FFBE24] h-full">
          <SheetHeader className="mb-6 pt-4 px-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold text-[#0C1930] font-playfair">
                {t('booking.title')} - {apartment.name}
              </SheetTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-[#F4F9FD] h-8 w-8"
                onClick={onClose}
              >
                <X className="w-5 h-5 text-[#20425C]" />
              </Button>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkin" className="text-[#0C1930] font-app font-medium text-sm">
                  {t('booking.checkin')}
                </Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 text-sm",
                        "border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6]",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#0077B6]" />
                      {checkIn ? format(checkIn, 'MMM dd') : t('booking.pickDate')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-auto p-0 bg-white border-gray-300 shadow-lg z-[10001]" 
                    align="start"
                    side="bottom"
                    sideOffset={4}
                    avoidCollisions={true}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="rounded-md border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="checkout" className="text-[#0C1930] font-app font-medium text-sm">
                  {t('booking.checkout')}
                </Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-10 text-sm",
                        "border-gray-300 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6]",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-[#0077B6]" />
                      {checkOut ? format(checkOut, 'MMM dd') : t('booking.pickDate')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-auto p-0 bg-white border-gray-300 shadow-lg z-[10001]" 
                    align="start"
                    side="bottom"
                    sideOffset={4}
                    avoidCollisions={true}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                  >
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) => date <= (checkIn || new Date())}
                      initialFocus
                      className="rounded-md border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Guest Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#0C1930] font-app font-medium text-sm">
                  {t('booking.adults')}
                </Label>
                <Select value={adults} onValueChange={setAdults}>
                  <SelectTrigger className="border-gray-300 bg-white focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-white border-gray-300 shadow-lg z-[10001]"
                    position="popper"
                    side="bottom"
                    sideOffset={4}
                    avoidCollisions={true}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[#0C1930] font-app font-medium text-sm">
                  {t('booking.children')}
                </Label>
                <Select value={children} onValueChange={setChildren}>
                  <SelectTrigger className="border-gray-300 bg-white focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent 
                    className="bg-white border-gray-300 shadow-lg z-[10001]"
                    position="popper"
                    side="bottom"
                    sideOffset={4}
                    avoidCollisions={true}
                  >
                    {[0, 1, 2, 3, 4].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#0C1930] font-app font-medium text-sm">
                  {t('booking.name')} *
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-gray-300 bg-white focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] h-10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0C1930] font-app font-medium text-sm">
                  {t('booking.email')} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 bg-white focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] h-10"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#0C1930] font-app font-medium text-sm">
                  {t('booking.phone')}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-gray-300 bg-white focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] h-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-app font-semibold text-lg py-3 h-12"
            >
              {isSubmitting ? t('booking.submitting') : t('booking.submit')}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingDrawer;