/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTouristStaticData } from "@/services/static/staics.service";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Wallet, 
  CreditCard,
  Map, 
  CalendarClock, 
  CheckCircle2, 
  ArrowRight, 
  CalendarDays,
  FileText,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// --- 1. Helper Components ---

const StatCard = ({ title, value, icon: Icon, colorClass, subtext }: any) => (
  <Card className="border-l-4 border-l-transparent hover:border-l-emerald-500 transition-all shadow-sm hover:shadow-md">
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
      </div>
      <div className={`p-3 rounded-full ${colorClass} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${colorClass.replace("bg-", "text-")}`} />
      </div>
    </CardContent>
  </Card>
);

const StatusProgressBar = ({ completed, upcoming, cancelled, total }: { completed: number, upcoming: number, cancelled: number, total: number }) => {
  if (total === 0) return <p className="text-sm text-gray-400">No activity to show</p>;
  
  const completedPercent = (completed / total) * 100;
  const upcomingPercent = (upcoming / total) * 100;
  const cancelledPercent = (cancelled / total) * 100;

  return (
    <div className="space-y-4">
      <div className="h-4 w-full bg-gray-100 rounded-full flex overflow-hidden">
        <div style={{ width: `${completedPercent}%` }} className="h-full bg-emerald-500" />
        <div style={{ width: `${upcomingPercent}%` }} className="h-full bg-blue-500" />
        <div style={{ width: `${cancelledPercent}%` }} className="h-full bg-red-400" />
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-gray-600 justify-center">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Completed ({completed})</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Upcoming ({upcoming})</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div> Cancelled ({cancelled})</div>
      </div>
    </div>
  );
};

// --- 2. Main Page Component ---

const TouristDashboardPage = async () => {
  const staticData = await getTouristStaticData();
  
  // Safe destructuring with default values based on your interface
  const stats = staticData?.data || {};
  const { 
    totalBookings = 0, 
    completedCount = 0, 
    upcomingCount = 0, 
    cancelledCount = 0, 
    totalPaid = 0, 
    totalReviews = 0,
    recentBookings = [],
    recentPayments = []
  } = stats;

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50/50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your travel history and payments.</p>
        </div>
        <Link href="/explore" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2">
           <Map className="w-4 h-4" /> Explore New Tours
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Spent" 
          value={`$${totalPaid.toLocaleString()}`} 
          icon={Wallet} 
          colorClass="bg-emerald-500 text-emerald-600" 
          subtext={`${totalReviews} reviews written`}
        />
        <StatCard 
          title="Total Bookings" 
          value={totalBookings} 
          icon={FileText} 
          colorClass="bg-indigo-500 text-indigo-600" 
          subtext="Lifetime reservations"
        />
        <StatCard 
          title="Completed Tours" 
          value={completedCount} 
          icon={CheckCircle2} 
          colorClass="bg-blue-500 text-blue-600" 
          subtext="Successfully finished"
        />
        <StatCard 
          title="Upcoming" 
          value={upcomingCount} 
          icon={CalendarClock} 
          colorClass="bg-amber-500 text-amber-600" 
          subtext="Ready to go"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Analytics & Payments */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Activity Breakdown */}
          <Card className="shadow-sm border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Booking Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <StatusProgressBar 
                  completed={completedCount} 
                  upcoming={upcomingCount} 
                  cancelled={cancelledCount} 
                  total={totalBookings} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Payments Section */}
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-500" /> Recent Payments
              </CardTitle>
              <Link href="/dashboard/tourist/payments" className="text-xs font-medium text-blue-600 hover:underline">
                View All
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 font-medium">Tour</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-3 font-medium">Amount</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentPayments.length > 0 ? recentPayments.slice(0, 5).map((pay: any) => (
                      <tr key={pay._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {pay.booking?.tour?.title || "Unknown Tour"}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {format(new Date(pay.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-700">
                          ${pay.amount}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={`
                            ${pay.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' : 
                              pay.status === 'FAILED' ? 'bg-red-50 text-red-700 border-red-200' : 
                              'bg-yellow-50 text-yellow-700 border-yellow-200'}
                          `}>
                            {pay.status}
                          </Badge>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No payment history found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Recent Bookings Feed */}
        <div className="lg:col-span-1">
          <Card className="h-full shadow-sm border-gray-100 flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Bookings</CardTitle>
                <Link href="/dashboard/tourist/bookings" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  History <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto max-h-[600px]">
              {recentBookings && recentBookings.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {recentBookings.map((booking: any) => (
                    <div key={booking._id} className="p-5 hover:bg-gray-50 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-[10px] px-2 py-0.5 
                            ${booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' : 
                              booking.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                              booking.status === 'CANCELLED' ? 'bg-gray-100 text-gray-600' :
                              'bg-amber-100 text-amber-700'}`}
                        >
                          {booking.status}
                        </Badge>
                        <span className="text-sm font-bold text-gray-900">${booking.totalPrice}</span>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-3 group-hover:text-emerald-700 transition-colors leading-snug">
                        {booking.tour?.title || "Unknown Tour"}
                      </h4>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 bg-white border rounded-lg p-2">
                         <div className="flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                            {booking.date ? format(new Date(booking.date), "MMM d") : "N/A"}
                         </div>
                         <Separator orientation="vertical" className="h-3" />
                         <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {booking.time}
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center h-40">
                  <p className="text-gray-500 text-sm">No recent bookings found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default TouristDashboardPage;