import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { format, addDays, differenceInDays } from 'date-fns';
import { Calendar as CalendarIcon, Check, Mail, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import emailjs from '@emailjs/browser';
import AvailabilityCalendar from './AvailabilityCalendar';

interface BookingFormProps {
  unit: Unit;
  initialDate?: Date;
  onClose: () => void;
}

const BookingForm = ({ unit, initialDate, onClose }: BookingFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>(initialDate);
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    initialDate ? addDays(initialDate, 3) : undefined
  );
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('0');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const nights = checkIn && checkOut ? 
    Math.max(1, differenceInDays(checkOut, checkIn)) : 0;
  
  const basePrice = nights * (unit.price_per_night || 0);
  const cleaningFee = 50;
  const serviceFee = Math.floor(basePrice * 0.1);
  const totalPrice = basePrice + cleaningFee + serviceFee;
  
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
      // Email parameters for EmailJS
      const emailParams = {
        to_email: 'borakapartmani0@gmail.com',
        apartment_name: unit.name,
        guest_name: name,
        guest_email: email,
        guest_phone: phone || 'Not provided',
        check_in_date: format(checkIn, 'MMMM dd, yyyy'),
        check_out_date: format(checkOut, 'MMMM dd, yyyy'),
        nights: nights,
        adults: adults,
        children: children,
        base_price: basePrice,
        cleaning_fee: cleaningFee,
        service_fee: serviceFee,
        total_price: totalPrice,
        special_requests: specialRequests || 'None',
        booking_timestamp: new Date().toLocaleString(),
        subject: `New Booking Request - ${unit.name} - ${format(checkIn, 'MMM dd, yyyy')}`
      };

      // Send email using EmailJS (you'll need to configure EmailJS service)
      // For now, this is a placeholder - user needs to set up EmailJS service
      console.log('Booking email would be sent with:', emailParams);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you within 24 hours to confirm your booking.",
      });
      
      // Show success and close
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: t('booking.error'),
        description: "Failed to send booking request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date Selection */}
      <div className="space-y-4">
        <h3 className="font-medium text-[#0C1930]">{t('booking.dates')}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkin" className="text-[#0C1930] font-medium text-sm">
              {t('booking.checkin')}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="checkin"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    "border-gray-300 bg-white hover:bg-gray-50",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#0077B6]" />
                  {checkIn ? format(checkIn, 'MMM dd, yyyy') : t('booking.pickDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <AvailabilityCalendar
                  unit={unit}
                  selectedDate={checkIn}
                  onDateSelect={setCheckIn}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="checkout" className="text-[#0C1930] font-medium text-sm">
              {t('booking.checkout')}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="checkout"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    "border-gray-300 bg-white hover:bg-gray-50",
                    !checkOut && "text-muted-foreground"
                  )}
                  disabled={!checkIn}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-[#0077B6]" />
                  {checkOut ? format(checkOut, 'MMM dd, yyyy') : t('booking.pickDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date <= (checkIn || new Date())}
                  className={cn("rounded-md p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {checkIn && checkOut && (
          <div className="text-sm text-[#20425C] font-medium">
            {nights} night{nights !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      
      {/* Guest Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-[#0C1930]">{t('booking.guestInfo')}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[#0C1930] font-medium text-sm">
              {t('booking.adults')}
            </Label>
            <Select value={adults} onValueChange={setAdults}>
              <SelectTrigger className="border-gray-300 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-[#0C1930] font-medium text-sm">
              {t('booking.children')}
            </Label>
            <Select value={children} onValueChange={setChildren}>
              <SelectTrigger className="border-gray-300 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4].map(num => (
                  <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#0C1930] font-medium text-sm">
            {t('booking.name')} *
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 bg-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#0C1930] font-medium text-sm">
            {t('booking.email')} *
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 bg-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[#0C1930] font-medium text-sm">
            {t('booking.phone')}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-gray-300 bg-white"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="special-requests" className="text-[#0C1930] font-medium text-sm">
            Special Requests
          </Label>
          <Textarea
            id="special-requests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="border-gray-300 bg-white"
            placeholder="Any special requests or questions..."
            rows={3}
          />
        </div>
      </div>
      
      {/* Price Summary */}
      {checkIn && checkOut && (
        <div className="bg-[#F4F9FD] p-4 rounded-lg space-y-3">
          <h3 className="font-medium text-[#0C1930]">{t('booking.priceSummary')}</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#20425C]">
                €{unit.price_per_night} x {nights} {t('booking.nights')}
              </span>
              <span className="text-[#0C1930] font-medium">€{basePrice}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#20425C]">{t('booking.cleaningFee')}</span>
              <span className="text-[#0C1930] font-medium">€{cleaningFee}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-[#20425C]">{t('booking.serviceFee')}</span>
              <span className="text-[#0C1930] font-medium">€{serviceFee}</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between font-semibold">
              <span className="text-[#0C1930]">{t('booking.total')}</span>
              <span className="text-[#0C1930]">€{totalPrice}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Trust Signals */}
      <div className="flex justify-between text-xs text-[#20425C]">
        <div className="flex items-center">
          <Check size={14} className="mr-1 text-green-600" />
          <span>{t('booking.freeCancellation')}</span>
        </div>
        <div className="flex items-center">
          <Shield size={14} className="mr-1 text-[#0077B6]" />
          <span>{t('booking.securePayment')}</span>
        </div>
      </div>
      
      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !checkIn || !checkOut}
        className="w-full bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] transition font-semibold py-6"
      >
        <Mail className="mr-2 h-5 w-5" />
        {isSubmitting ? 'Sending Request...' : 'Send Booking Request'}
      </Button>
    </form>
  );
};

export default BookingForm;