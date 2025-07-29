import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit, supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import AvailabilityCalendar from './AvailabilityCalendar';
import { format } from 'date-fns'; 

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
  // Calculate nights and price
  const nights = checkIn && checkOut ? Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  const basePrice = nights * (apartment.price_per_night || 100);
  const cleaningFee = 50;
  const serviceFee = Math.floor(basePrice * 0.1);
  const totalPrice = basePrice + cleaningFee + serviceFee;

  // Send email using EmailJS
  const emailData = {
    guest_name: name,
    guest_email: email,
    guest_phone: phone,
    apartment_name: apartment.name,
    check_in: format(checkIn, 'yyyy-MM-dd'),
    check_out: format(checkOut, 'yyyy-MM-dd'),
    adults: adults,
    total_nights: nights,
    total_price: totalPrice,
    booking_date: new Date().toLocaleString()
  };

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: 'service_li7uydk',
      template_id: 'template_wej8qwt',
      user_id: 'TsQLwgQ4gJqpaGTtH',
      template_params: emailData
    })
  });

  if (!response.ok) {
    throw new Error('Email sending failed');
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
    description: "Booking request sent! We'll contact you within 24 hours.",
  });

} catch (error) {
  console.error('Email sending error:', error);
  toast({
    title: t('booking.error'),
    description: "Failed to send booking request. Please try again.",
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
            {/* Calendar for Date Selection */}
            <div className="space-y-2">
              <Label className="text-[#0C1930] font-app font-medium text-sm">
                Select Your Dates
              </Label>
              <AvailabilityCalendar 
                unit={apartment}
                selectedDate={checkIn}
                onDateSelect={setCheckIn}
                selectedEndDate={checkOut}
                onEndDateSelect={setCheckOut}
                mode="range"
              />
              {checkIn && checkOut && (
                <div className="text-sm text-[#0077B6] font-medium mt-2">
                  {format(checkIn, 'MMM dd')} - {format(checkOut, 'MMM dd')}
                </div>
              )}
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