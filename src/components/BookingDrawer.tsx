
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { toast } from '@/hooks/use-toast';
import { Unit } from '@/lib/supabase';
import { reserveApartment } from '@/hooks/useBookings';

interface BookingDrawerProps {
  apartment: Unit;
  onClose: () => void;
}

interface BookingData {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  adults: string;
  children: string;
  name: string;
  email: string;
  phone: string;
}

const BookingDrawer = ({ apartment, onClose }: BookingDrawerProps) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingData>({
    checkIn: undefined,
    checkOut: undefined,
    adults: '2',
    children: '0',
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.checkIn || !formData.checkOut) {
      toast({
        title: t('booking.error'),
        description: t('booking.selectDates'),
        variant: "destructive"
      });
      return;
    }
    if (formData.checkOut <= formData.checkIn) {
      toast({
        title: t('booking.error'),
        description: t('booking.invalidDates'),
        variant: "destructive"
      });
      return;
    }
    if (!formData.name || !formData.email) {
      toast({
        title: t('booking.error'),
        description: t('booking.fillRequired'),
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const bookingPayload = {
        apartmentId: apartment.id,
        apartmentName: apartment.name,
        ...formData,
        checkIn: formData.checkIn.toISOString(),
        checkOut: formData.checkOut.toISOString(),
        totalGuests: parseInt(formData.adults) + parseInt(formData.children)
      };
      await reserveApartment(bookingPayload);
      toast({
        title: t('booking.success'),
        description: t('booking.successDesc')
      });
      onClose();
    } catch (error) {
      toast({
        title: t('booking.error'),
        description: t('booking.errorDesc'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-surface shadow-2xl rounded-2xl before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent border-0">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-primary font-playfair">
              {t('booking.title')} {apartment.name}
            </SheetTitle>
          </div>
          <div className="text-lg font-semibold text-accent font-app">
            €{apartment.price_per_night}{t('modal.perNight')}
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Check-in Date */}
          <div>
            <Label htmlFor="checkin" className="font-app text-primary">{t('booking.checkin')} *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal font-app bg-surface border-secondary hover:bg-mist focus-visible:ring-link">
                  <CalendarIcon className="mr-2 h-4 w-4 text-secondary" />
                  {formData.checkIn ? format(formData.checkIn, "PPP") : t('booking.pickDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-surface border-secondary" align="start">
                <Calendar 
                  mode="single" 
                  selected={formData.checkIn} 
                  onSelect={date => setFormData(prev => ({ ...prev, checkIn: date }))} 
                  disabled={date => date < today} 
                  initialFocus 
                  className="pointer-events-auto" 
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div>
            <Label htmlFor="checkout" className="font-app text-primary">{t('booking.checkout')} *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal font-app bg-surface border-secondary hover:bg-mist focus-visible:ring-link">
                  <CalendarIcon className="mr-2 h-4 w-4 text-secondary" />
                  {formData.checkOut ? format(formData.checkOut, "PPP") : t('booking.pickDate')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-surface border-secondary" align="start">
                <Calendar 
                  mode="single" 
                  selected={formData.checkOut} 
                  onSelect={date => setFormData(prev => ({ ...prev, checkOut: date }))} 
                  disabled={date => date <= (formData.checkIn || today)} 
                  initialFocus 
                  className="pointer-events-auto" 
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adults" className="font-app text-primary">{t('booking.adults')} *</Label>
              <Select value={formData.adults} onValueChange={value => setFormData(prev => ({ ...prev, adults: value }))}>
                <SelectTrigger className="font-app bg-surface border-secondary focus-visible:ring-link">
                  <SelectValue placeholder={t('booking.adults')} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-secondary">
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()} className="font-app hover:bg-mist focus:bg-mist">
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="children" className="font-app text-primary">{t('booking.children')}</Label>
              <Select value={formData.children} onValueChange={value => setFormData(prev => ({ ...prev, children: value }))}>
                <SelectTrigger className="font-app bg-surface border-secondary focus-visible:ring-link">
                  <SelectValue placeholder={t('booking.children')} />
                </SelectTrigger>
                <SelectContent className="bg-surface border-secondary">
                  {[0, 1, 2, 3, 4].map(num => (
                    <SelectItem key={num} value={num.toString()} className="font-app hover:bg-mist focus:bg-mist">
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <Label htmlFor="name" className="font-app text-primary">{t('booking.name')} *</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))} 
              placeholder={t('booking.name')} 
              required 
              className="font-app bg-surface border-secondary focus-visible:ring-link" 
            />
          </div>

          <div>
            <Label htmlFor="email" className="font-app text-primary">{t('booking.email')} *</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} 
              placeholder={t('booking.email')} 
              required 
              className="font-app bg-surface border-secondary focus-visible:ring-link" 
            />
          </div>

          <div>
            <Label htmlFor="phone" className="font-app text-primary">{t('booking.phone')}</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone} 
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))} 
              placeholder={t('booking.phone')} 
              className="font-app bg-surface border-secondary focus-visible:ring-link" 
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-link text-white hover:bg-accent hover:text-primary transition font-app font-semibold py-3 focus-visible:ring-link"
          >
            {isSubmitting ? t('booking.submitting') : t('booking.submit')}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default BookingDrawer;
