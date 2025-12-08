// app/payment-success/page.tsx
import TopGap from "@/components/shared/TopGap";
import { CheckCircle, Home, Calendar } from "lucide-react"; // Importing Lucide Icons
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <TopGap />
      <div className="max-w-md w-full p-8 text-center bg-white rounded-xl shadow-2xl border-t-8 border-t-green-600">
        
        {/* Success Icon */}
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6 animate-pulse" />
        
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Payment Successful! 🎉
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your booking. Your payment has been confirmed, and your tour is officially reserved.
        </p>
        
        <div className="space-y-3">
            <Link href="/dashboard/my-booking" passHref>
                <Button className="w-full bg-green-600 hover:bg-green-700 transition-shadow duration-300 shadow-lg shadow-green-500/50" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    View My Bookings
                </Button>
            </Link>
            <Link href="/" passHref>
                <Button variant="outline" className="w-full mt-3 border-gray-300 text-gray-600 hover:bg-gray-50">
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}