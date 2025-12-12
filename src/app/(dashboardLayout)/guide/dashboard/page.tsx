import { getGuideStaticData } from "@/services/static/staics.service";
import Link from "next/link";
import { format } from "date-fns";
import { 
  Wallet, 
  Map, 
  Users, 
  Star, 
  TrendingUp, 
  ArrowRight, 
  CalendarDays,
  Clock,
  MoreHorizontal,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// --- 1. Helper Components ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const StatusProgressBar = ({ completed, upcoming, total }: { completed: number, upcoming: number, total: number }) => {
  // Calculate stats to avoid division by zero
  const safeTotal = total || 1;
  const cancelled = Math.max(0, total - (completed + upcoming));
  
  const completedPercent = (completed / safeTotal) * 100;
  const upcomingPercent = (upcoming / safeTotal) * 100;
  const cancelledPercent = (cancelled / safeTotal) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="font-semibold text-gray-700">Performance Overview</span>
        <span className="text-gray-500 text-xs">{total} Total Bookings</span>
      </div>
      <div className="h-3 w-full bg-gray-100 rounded-full flex overflow-hidden">
        <div style={{ width: `${completedPercent}%` }} className="h-full bg-emerald-500" title="Completed" />
        <div style={{ width: `${upcomingPercent}%` }} className="h-full bg-blue-500" title="Upcoming" />
        <div style={{ width: `${cancelledPercent}%` }} className="h-full bg-red-400" title="Cancelled/Other" />
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Completed ({completed})</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Upcoming ({upcoming})</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div> Cancelled ({cancelled})</div>
      </div>
    </div>
  );
};

// --- 2. Main Guide Dashboard Component ---

const GuideDashboardPage = async () => {
  const staticData = await getGuideStaticData();
  
  // Safe extraction with defaults
  const stats = staticData?.data || {};
  const { 
    totalTours = 0,
    totalBookings = 0,
    completedBookings = 0,
    upcomingBookings = 0,
    earnings = 0,
    reviewCount = 0,
    avgRating = 0,
    recentBookings = [],
    recentPayments = []
  } = stats;

  return (
    <div className="p-6 md:p-8 space-y-8 bg-gray-50/50 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Guide Dashboard</h1>
          <p className="text-gray-500 mt-1">Track your tours, bookings, and earnings.</p>
        </div>
        <div className="flex gap-3">
           <Link href="/guide/dashboard/add-listing">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Map className="w-4 h-4 mr-2" /> Create New Tour
            </Button>
           </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Earnings" 
          value={`$${earnings.toLocaleString()}`} 
          icon={Wallet} 
          colorClass="bg-emerald-500 text-emerald-600" 
          subtext="Available Balance"
        />
        <StatCard 
          title="Avg Rating" 
          value={avgRating.toFixed(1)} 
          icon={Star} 
          colorClass="bg-yellow-500 text-yellow-600" 
          subtext={`Based on ${reviewCount} reviews`}
        />
        <StatCard 
          title="Total Bookings" 
          value={totalBookings} 
          icon={Users} 
          colorClass="bg-blue-500 text-blue-600" 
          subtext={`${upcomingBookings} Upcoming`}
        />
        <StatCard 
          title="Active Tours" 
          value={totalTours} 
          icon={Map} 
          colorClass="bg-indigo-500 text-indigo-600" 
          subtext="Published Listings"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Analytics & Bookings */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Status Breakdown */}
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-400" /> Activity Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="bg-white p-2">
                    <StatusProgressBar 
                        completed={completedBookings} 
                        upcoming={upcomingBookings} 
                        total={totalBookings} 
                    />
                </div>
            </CardContent>
          </Card>

          {/* Recent Bookings List */}
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Bookings</CardTitle>
              <Link href="/dashboard/guide/bookings" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-0">
                {recentBookings.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {recentBookings.map((booking: any) => (
                            <div key={booking._id} className="p-5 hover:bg-gray-50 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                            {booking.user?.name || "Guest"}
                                        </h4>
                                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 border-0
                                            ${booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' : 
                                              booking.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                                              'bg-gray-100 text-gray-600'}`}>
                                            {booking.status}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-1">{booking.tour?.title}</p>
                                    
                                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                                        <div className="flex items-center gap-1">
                                            <CalendarDays className="w-3 h-3" />
                                            {booking.date ? format(new Date(booking.date), "MMM d") : "N/A"}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {booking.time}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-4 min-w-[120px]">
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-900">${booking.totalPrice}</p>
                                        <p className={`text-[10px] font-medium uppercase ${booking.paymentStatus === 'PAID' ? 'text-emerald-600' : 'text-red-500'}`}>
                                            {booking.paymentStatus}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 text-sm">No recent bookings.</div>
                )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Financials */}
        <div className="lg:col-span-1 space-y-6">
            
            {/* Recent Payments / Earnings Feed */}
            <Card className="h-full shadow-sm border-gray-100 flex flex-col">
                <CardHeader className="pb-4 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-md font-semibold text-gray-800 flex items-center gap-2">
                            <Wallet className="w-4 h-4 text-gray-500" /> Recent Transactions
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-y-auto max-h-[600px]">
                    {recentPayments.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {recentPayments.map((payment: any) => (
                                <div key={payment._id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-medium text-gray-900">
                                                {payment.booking?.user?.name || "Unknown User"}
                                            </p>
                                            <p className="text-[10px] text-gray-500 mt-0.5">
                                                {format(new Date(payment.createdAt), "MMM d, yyyy")}
                                            </p>
                                        </div>
                                        <span className="text-sm font-bold text-emerald-600">
                                            +${payment.amount}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <Badge variant="secondary" className="text-[10px] px-1.5 h-5 bg-gray-100 text-gray-600 font-normal">
                                            {payment.status}
                                        </Badge>
                                        <div className="text-[10px] text-gray-400 font-mono">
                                            ID: {payment.transactionId?.slice(-6)}...
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 text-sm">No recent transactions.</p>
                        </div>
                    )}
                </CardContent>
                <div className="p-3 border-t border-gray-100 bg-gray-50/50 text-center">
                    <Link href="/dashboard/guide/payments" className="text-xs font-medium text-blue-600 hover:underline flex items-center justify-center gap-1">
                        <FileText className="w-3 h-3" /> View Financial Report
                    </Link>
                </div>
            </Card>
        </div>

      </div>
    </div>
  );
};

export default GuideDashboardPage;