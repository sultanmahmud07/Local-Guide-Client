
import TopGap from "@/components/shared/TopGap";
import { AlertTriangle, CreditCard } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <TopGap />
      <div className="max-w-md w-full p-8 text-center bg-white rounded-xl shadow-2xl border-t-8 border-t-red-600">
        
        {/* Failure Icon (Red/Error) */}
        <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-6" />
        
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Payment Failed! 😥
        </h1>
        
        <p className="text-gray-600 mb-6">
          There was an issue processing your payment (e.g., card decline, network error). Please check your payment details or try again.
        </p>
        
        <div className="space-y-3">
            <Link href="/dashboard/my-booking" passHref>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" size="lg">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Re-Attempt Payment
                </Button>
            </Link>
            <Link href="/contact" passHref>
                <Button variant="outline" className="w-full mt-3 border-gray-300 text-gray-600 hover:bg-gray-50">
                    Need Help? Contact Support
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}