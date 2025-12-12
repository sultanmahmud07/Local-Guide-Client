/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { bookingRequest } from '@/services/booking/myBooking.service';
import { useRouter } from 'next/navigation';

// Define the shape of the form data
interface RequestFormData {
    tourDate: string;
    meetingTime: string;
    guests: string;
    hotelAccommodation: string;
    interestedTour: string;
    message: string;
    guide: string;

}

// 🎯 Replace with your actual Server Action or API call
async function submitRequestAction(formData: RequestFormData, guideId: string) {
    console.log("Submitting request for Guide:", guideId, formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Check for success condition
    if (formData.message.length > 10) {
        return { success: true, message: "Your request has been sent to the guide!" };
    } else {
        return { success: false, message: "Please provide a detailed message." };
    }
}

export default function MessageRequestForm({ guideId }: { guideId: string }) {
    const [formData, setFormData] = useState<RequestFormData>({
        tourDate: '',
        meetingTime: '',
        guests: '2 Adults',
        hotelAccommodation: '',
        interestedTour: '',
        message: '',
        guide: guideId
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: keyof RequestFormData, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // const result = await bookingRequest(formData);
            // if (result.success) {
            //     toast.success(result.message);
            //     // Optionally reset form
            // } else {
            //     toast.error(result.message);
            // }
            toast.success("Message sent successfully! The guide will contact you soon.");
            router.back();
        } catch (error) {
            toast.error("Network error. Failed to send request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Request a Personalized Tour or Booking</CardTitle>
                <p className="text-sm text-muted-foreground">Fill out the details below, and the guide will contact you shortly.</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Tour Date & Meeting Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tourDate">Tour Date *</Label>
                            <div className="relative">
                                <Calendar className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
                                <Input id="tourDate" name="tourDate" type="date" onChange={handleChange} required className="pl-10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meetingTime">Meeting Time</Label>
                            <div className="relative">
                                <Clock className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
                                <Select onValueChange={(val) => handleSelectChange('meetingTime', val)} defaultValue={formData.meetingTime}>
                                    <SelectTrigger id="meetingTime" className="pl-10">
                                        <SelectValue placeholder="Start Time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="morning">Morning (8:00 AM - 10:00 AM)</SelectItem>
                                        <SelectItem value="afternoon">Afternoon (1:00 PM - 3:00 PM)</SelectItem>
                                        <SelectItem value="flexible">Flexible</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Guests & Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="guests">Guests *</Label>
                            <div className="relative">
                                <Users className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
                                <Select onValueChange={(val) => handleSelectChange('guests', val)} defaultValue={formData.guests}>
                                    <SelectTrigger id="guests" className="pl-10">
                                        <SelectValue placeholder="2 Adults" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1 Adult">1 Adult</SelectItem>
                                        <SelectItem value="2 Adults">2 Adults</SelectItem>
                                        <SelectItem value="3-5 People">3-5 People</SelectItem>
                                        <SelectItem value="6+ People">6+ People</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="area">Area</Label>
                            <Input id="area" name="area" placeholder="e.g., Dhaka, Narayanganj" onChange={handleChange} />
                        </div>
                    </div>

                    {/* Hotel / Accommodation */}
                    <div className="space-y-2">
                        <Label htmlFor="hotelAccommodation">Hotel / Accommodation / Cruise Port</Label>
                        <Input id="hotelAccommodation" name="hotelAccommodation" onChange={handleChange} placeholder="Providing details helps the guide plan." />
                        <p className="text-xs text-muted-foreground">Providing your accommodation details will help the supplier more accurately plan the itinerary and offer better pickup and drop-off options.</p>
                    </div>

                    {/* Interested Tour */}
                    <div className="space-y-2">
                        <Label htmlFor="interestedTour">Interested Tour</Label>
                        <Select onValueChange={(val) => handleSelectChange('interestedTour', val)} defaultValue={formData.interestedTour}>
                            <SelectTrigger id="interestedTour">
                                <SelectValue placeholder="Select an available tour or choose 'Personalized Tour'" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Replace with dynamically loaded tours from the guide's profile, or fetch separately */}
                                <SelectItem value="tour-a">Old Dhaka Private Tour</SelectItem>
                                <SelectItem value="personalized">Personalized Tour</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">To help your supplier assist you faster, select an available tour or choose Personalized Tour.</p>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="E.g., We're a family of four (kids aged 14 & 10), interested in a full-day tour that includes local cuisine. It's our first time in [city] and we'll be staying for a total of 3 days."
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700">
                        {isSubmitting ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5 mr-2" />
                        )}
                        Send a Message
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}