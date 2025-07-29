import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Unit, supabase } from '@/lib/supabase';
import { Calendar as CalendarIcon, Users, Star, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AvailabilityCalendar from './AvailabilityCalendar';
import BookingForm from './BookingForm';
import { useRealtimeBookings } from '@/hooks/useBookings';

interface BookingFlowProps {
  units: Unit[];
}

const BookingFlow = ({ units }: BookingFlowProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [hoverUnit, setHoverUnit] = useState<string | null>(null);
  
  // Get bookings for the currently hovered unit
  const { data: bookings, loading } = useRealtimeBookings(hoverUnit || undefined);

  // Testimonials/reviews data
  const testimonials = [
    { id: 1, author: "Maria S.", rating: 5, text: "Absolutely perfect stay! The views were breathtaking and the apartment was immaculate." },
    { id: 2, author: "James T.", rating: 5, text: "We had a wonderful family vacation. The location is ideal and the staff was incredibly helpful." },
    { id: 3, author: "Sophie L.", rating: 4, text: "Beautiful property with all the amenities we needed. Highly recommend!" }
  ];

  const handleBookNow = (unit: Unit) => {
    setSelectedUnit(unit);
    setShowBookingForm(true);
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
    setStartDate(undefined);
  };

  const handleCalendarOpen = (unitId: string) => {
    setHoverUnit(unitId);
  };

  const handleCalendarClose = () => {
    setHoverUnit(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-playfair font-bold text-[#0C1930]">
            {t('bookingFlow.title')}
          </h2>
          <TabsList className="bg-[#F4F9FD]">
            <TabsTrigger value="grid">{t('bookingFlow.gridView')}</TabsTrigger>
            <TabsTrigger value="list">{t('bookingFlow.listView')}</TabsTrigger>
          </TabsList>
        </div>

        {/* Grid View */}
        <TabsContent value="grid" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {units.map((unit) => (
              <Card 
                key={unit.id} 
                className={cn(
                  "overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                  unit.featured ? "col-span-1 md:col-span-2" : ""
                )}
              >
                <div className="relative">
                  <img 
                    src={unit.images?.[0] || '/placeholder.svg'} 
                    alt={unit.name}
                    className={cn(
                      "w-full object-cover",
                      unit.featured ? "h-80 md:h-96" : "h-64"
                    )}
                  />
                  {unit.featured && (
                    <Badge className="absolute top-4 left-4 bg-[#FFBE24] text-[#0C1930] border-none">
                      {t('bookingFlow.featured')}
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 bg-[#0077B6] text-white px-3 py-1 rounded-full font-medium text-sm">
                    €{unit.price_per_night}/night
                  </div>
                </div>

                <CardContent className={cn("p-6", unit.featured ? "md:flex" : "")}>
                  <div className={cn(unit.featured ? "md:w-2/3 md:pr-8" : "")}>
                    <h3 className="text-xl font-playfair font-bold mb-2 text-[#0C1930]">{unit.name}</h3>
                    <p className="text-[#20425C] mb-4">{unit.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {/* Static amenities since no amenities in Unit interface */}
                      <Badge variant="outline" className="bg-[#F4F9FD] text-[#20425C] border-[#E2EDF3]">
                        Free WiFi
                      </Badge>
                      <Badge variant="outline" className="bg-[#F4F9FD] text-[#20425C] border-[#E2EDF3]">
                        Parking
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#20425C] mb-4">
                      <div className="flex items-center gap-1">
                        <Users size={16} className="text-[#0077B6]" />
                        <span>{t('modal.guests', { count: unit.max_guests })}</span>
                      </div>
                      <div>
                        <span>{t('modal.size', { size: unit.size_m2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className={cn("flex flex-col gap-3", unit.featured ? "md:w-1/3" : "")}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="border-[#0077B6] text-[#0077B6] w-full">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {t('bookingFlow.checkAvailability')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent 
                        className="w-auto p-0" 
                        align="center"
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onInteractOutside={(e) => e.preventDefault()}
                        onPointerDownOutside={(e) => e.preventDefault()}
                        onFocusOutside={(e) => e.preventDefault()}
                      >
                        <div className="p-2 bg-white">
                          <h4 className="text-sm font-medium mb-2 text-[#0C1930]">
                            {t('bookingFlow.availability')}
                          </h4>
                          <AvailabilityCalendar 
                            unit={unit} 
                            selectedDate={startDate}
                            onDateSelect={setStartDate}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Button 
                      className="bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930] w-full"
                      onClick={() => handleBookNow(unit)}
                    >
                      {t('bookingFlow.bookNow')}
                    </Button>
                    
                    <div className="flex items-center gap-1 justify-center text-sm mt-1">
                      <Check size={14} className="text-green-600" />
                      <span className="text-[#20425C]">{t('bookingFlow.instantBooking')}</span>
                    </div>
                  </div>
                </CardContent>
                
                {/* Mini Reviews */}
                {unit.featured && (
                  <div className="bg-[#F4F9FD] px-6 py-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          size={16}
                          className="fill-[#FFBE24] text-[#FFBE24]"
                        />
                      ))}
                      <span className="text-sm text-[#20425C] ml-1">({testimonials.length} reviews)</span>
                    </div>
                    <p className="text-[#20425C] text-sm italic">"{testimonials[0].text}"</p>
                    <p className="text-[#0C1930] text-sm font-medium mt-1">— {testimonials[0].author}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          {units.map((unit) => (
            <Card key={unit.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={unit.images?.[0] || '/placeholder.svg'} 
                    alt={unit.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <CardContent className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-playfair font-bold mb-2 text-[#0C1930]">{unit.name}</h3>
                      <p className="text-[#20425C] mb-4">{unit.description}</p>
                    </div>
                    <div className="bg-[#0077B6] text-white px-3 py-1 rounded-full font-medium text-sm">
                      €{unit.price_per_night}/night
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* Static amenities since no amenities in Unit interface */}
                    <Badge variant="outline" className="bg-[#F4F9FD] text-[#20425C] border-[#E2EDF3]">
                      Free WiFi
                    </Badge>
                    <Badge variant="outline" className="bg-[#F4F9FD] text-[#20425C] border-[#E2EDF3]">
                      Parking
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-[#20425C] mb-4">
                    <div className="flex items-center gap-1">
                      <Users size={16} className="text-[#0077B6]" />
                      <span>{t('modal.guests', { count: unit.max_guests })}</span>
                    </div>
                    <div>
                      <span>{t('modal.size', { size: unit.size_m2 })}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="border-[#0077B6] text-[#0077B6]">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {t('bookingFlow.checkAvailability')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent 
                        className="w-auto p-0" 
                        align="center"
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onInteractOutside={(e) => e.preventDefault()}
                        onPointerDownOutside={(e) => e.preventDefault()}
                        onFocusOutside={(e) => e.preventDefault()}
                      >
                        <div className="p-2 bg-white">
                          <h4 className="text-sm font-medium mb-2 text-[#0C1930]">
                            {t('bookingFlow.availability')}
                          </h4>
                          <AvailabilityCalendar 
                            unit={unit} 
                            selectedDate={startDate}
                            onDateSelect={setStartDate}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Button 
                      className="bg-[#0077B6] text-white hover:bg-[#FFBE24] hover:text-[#0C1930]"
                      onClick={() => handleBookNow(unit)}
                    >
                      {t('bookingFlow.bookNow')}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Booking Form Sheet */}
      {selectedUnit && (
        <Sheet open={showBookingForm} onOpenChange={handleCloseBooking}>
          <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="font-playfair text-[#0C1930]">
                Book {selectedUnit.name}
              </SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <BookingForm 
                unit={selectedUnit} 
                initialDate={startDate}
                onClose={handleCloseBooking}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default BookingFlow;