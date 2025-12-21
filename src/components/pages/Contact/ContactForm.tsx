/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

// 1. Define the shape of your form data
type ContactFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactForm = () => {
  // 2. Initialize the hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>();

  // 3. Define the submit handler
  const onSubmit: SubmitHandler<ContactFormInputs> = async (data:any) => {
    // This 'data' object contains all your values
    console.log("Form Values:", data);

    // Simulate an API call (Optional: remove this setTimeout in real usage)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show Success Toast
    toast.success("Message sent successfully!", {
      description: "We'll get back to you shortly.",
    });

    // Reset the form
    reset();
  };

  return (
    // 4. Connect handleSubmit to the form
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">First Name</label>
          <Input
            placeholder="e.g. Sultan"
            className={`bg-gray-50 border-gray-200 h-12 ${errors.firstName ? 'border-red-500' : ''}`}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <span className="text-xs text-red-500">First Name is required</span>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Last Name</label>
          <Input
            placeholder="e.g. Mahmud"
            className={`bg-gray-50 border-gray-200 h-12 ${errors.lastName ? 'border-red-500' : ''}`}
            {...register("lastName", { required: true })}
          />
           {errors.lastName && <span className="text-xs text-red-500">Last Name is required</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Email Address</label>
          <Input
            type="email"
            placeholder="you@example.com"
            className={`bg-gray-50 border-gray-200 h-12 ${errors.email ? 'border-red-500' : ''}`}
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-xs text-red-500">Email is required</span>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Phone (Optional)</label>
          <Input
            type="tel"
            placeholder="+880..."
            className="bg-gray-50 border-gray-200 h-12"
            {...register("phone")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Subject</label>
        <select
          className="flex h-12 w-full items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("subject")}
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Booking Issue">Booking Issue</option>
          <option value="Become a Guide">Become a Guide</option>
          <option value="Technical Support">Technical Support</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Message</label>
        <Textarea
          placeholder="How can we help you today?"
          className={`bg-gray-50 border-gray-200 min-h-[150px] resize-none ${errors.message ? 'border-red-500' : ''}`}
          {...register("message", { required: true })}
        />
        {errors.message && <span className="text-xs text-red-500">Message is required</span>}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-bold py-6 text-base rounded-xl disabled:opacity-70"
      >
        <Send className="w-4 h-4 mr-2" /> 
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;