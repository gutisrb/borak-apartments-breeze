
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface Apartment {
  id: string;
  title: string;
  maxGuests: number;
  sizeM2: number;
  pricePerNight: number;
  images: string[];
  description: string;
  amenities: string[];
}

interface BookingDrawerProps {
  apartment: Apartment;
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

// TODO - replace with Supabase RPC later
const reserveApartment = async (data: any) => {
  console.log('Booking data:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
};

const BookingDrawer = ({ apartment, onClose }: BookingDrawerProps) => {
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
        title: "Error",
        description: "Please select check-in and check-out dates",
        variant: "destructive"
      });
      return;
    }

    if (formData.checkOut <= formData.checkIn) {
      toast({
        title: "Error",
        description: "Check-out date must be after check-in date",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const bookingPayload = {
        apartmentId: apartment.id,
        apartmentTitle: apartment.title,
        ...formData,
        checkIn: formData.checkIn.toISOString(),
        checkOut: formData.checkOut.toISOString(),
        totalGuests: parseInt(formData.adults) + parseInt(formData.children)
      };

      await reserveApartment(bookingPayload);
      
      toast({
        title: "Request received!",
        description: "We'll confirm availability shortly.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-[#0c1930]">
              Book {apartment.title}
            </SheetTitle>
            <Button onClick={onClose} variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-lg font-semibold text-[#ffbe24]">
            €{apartment.pricePerNight}/night
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Check-in Date */}
          <div>
            <Label htmlFor="checkin">Check-in Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.checkIn ? format(formData.checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.checkIn}
                  onSelect={(date) => setFormData(prev => ({ ...prev, checkIn: date }))}
                  disabled={(date) => date < today}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div>
            <Label htmlFor="checkout">Check-out Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.checkOut ? format(formData.checkOut, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.checkOut}
                  onSelect={(date) => setFormData(prev => ({ ...prev, checkOut: date }))}
                  disabled={(date) => date <= (formData.checkIn || today)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adults">Adults *</Label>
              <Select value={formData.adults} onValueChange={(value) => setFormData(prev => ({ ...prev, adults: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Adults" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="children">Children</Label>
              <Select value={formData.children} onValueChange={(value) => setFormData(prev => ({ ...prev, children: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Children" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+385 ..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ffbe24] hover:bg-[#ffbe24]/90 text-[#0c1930] font-semibold py-3"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default BookingDrawer;
