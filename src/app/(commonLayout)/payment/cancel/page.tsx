// app/payment-cancel/page.tsx
import TopGap from "@/components/shared/TopGap";
import { XOctagon, ChevronLeft, Home } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <TopGap />
      <div className="max-w-md w-full p-8 text-center bg-white rounded-xl shadow-2xl border-t-8 border-t-yellow-500">
        
        {/* Cancel Icon (Yellow/Warning) */}
        <XOctagon className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
        
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Payment Cancelled
        </h1>
        
        <p className="text-gray-600 mb-6">
          You cancelled the payment process. Your tour reservation has **not** been completed.
        </p>
        
        <div className="space-y-3">
            <Link href="/dashboard/my-booking" passHref>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" size="lg">
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Try Payment Again
                </Button>
            </Link>
            <Link href="/" passHref>
                <Button variant="outline" className="w-full mt-3 border-gray-300 text-gray-600 hover:bg-gray-50">
                    <Home className="w-5 h-5 mr-2" />
                    Explore Other Tours
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}