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
const BookingDrawer = ({
  apartment,
  onClose
}: BookingDrawerProps) => {
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
        apartmentName: apartment.name,
        ...formData,
        checkIn: formData.checkIn.toISOString(),
        checkOut: formData.checkOut.toISOString(),
        totalGuests: parseInt(formData.adults) + parseInt(formData.children)
      };
      await reserveApartment(bookingPayload);
      toast({
        title: "Zahtev je poslat!",
        description: "Uskoro ćemo potvrditi dostupnost."
      });
      onClose();
    } catch (error) {
      toast({
        title: "Greška",
        description: "Nešto je pošlo po zlu. Molimo pokušajte ponovo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const today = new Date();
  return <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-surface shadow-2xl rounded-2xl before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-accent">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-primary font-playfair">
              Rezerviši {apartment.name}
            </SheetTitle>
            
          </div>
          <div className="text-lg font-semibold text-accent font-app">
            €{apartment.price_per_night}/noć
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Check-in Date */}
          <div>
            <Label htmlFor="checkin" className="font-app text-primary">Datum dolaska *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal font-app">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.checkIn ? format(formData.checkIn, "PPP") : "Izaberite datum"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={formData.checkIn} onSelect={date => setFormData(prev => ({
                ...prev,
                checkIn: date
              }))} disabled={date => date < today} initialFocus className="pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div>
            <Label htmlFor="checkout" className="font-app text-primary">Datum odlaska *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal font-app">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.checkOut ? format(formData.checkOut, "PPP") : "Izaberite datum"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={formData.checkOut} onSelect={date => setFormData(prev => ({
                ...prev,
                checkOut: date
              }))} disabled={date => date <= (formData.checkIn || today)} initialFocus className="pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adults" className="font-app text-primary">Odrasli *</Label>
              <Select value={formData.adults} onValueChange={value => setFormData(prev => ({
              ...prev,
              adults: value
            }))}>
                <SelectTrigger className="font-app">
                  <SelectValue placeholder="Odrasli" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => <SelectItem key={num} value={num.toString()} className="font-app">{num}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="children" className="font-app text-primary">Deca</Label>
              <Select value={formData.children} onValueChange={value => setFormData(prev => ({
              ...prev,
              children: value
            }))}>
                <SelectTrigger className="font-app">
                  <SelectValue placeholder="Deca" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map(num => <SelectItem key={num} value={num.toString()} className="font-app">{num}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <Label htmlFor="name" className="font-app text-primary">Ime i prezime *</Label>
            <Input id="name" value={formData.name} onChange={e => setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))} placeholder="Vaše ime i prezime" required className="font-app" />
          </div>

          <div>
            <Label htmlFor="email" className="font-app text-primary">Email *</Label>
            <Input id="email" type="email" value={formData.email} onChange={e => setFormData(prev => ({
            ...prev,
            email: e.target.value
          }))} placeholder="vas@email.com" required className="font-app" />
          </div>

          <div>
            <Label htmlFor="phone" className="font-app text-primary">Telefon (opciono)</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData(prev => ({
            ...prev,
            phone: e.target.value
          }))} placeholder="+381 ..." className="font-app" />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-highlight text-primary hover:text-white transition font-app font-semibold py-3">
            {isSubmitting ? 'Šalje se...' : 'Pošalji zahtev za rezervaciju'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>;
};
export default BookingDrawer;