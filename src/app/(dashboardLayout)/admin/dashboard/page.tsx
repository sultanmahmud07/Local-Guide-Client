/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  DollarSign,
  Users,
  Map as MapIcon,
  CalendarCheck,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getAdminStaticData } from "@/services/static/staics.service";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// --- 1. STRICT TYPE DEFINITIONS ---

interface IUserSummary {
  _id: string;
  name: string;
  email: string;
  picture?: string;
}

interface ITourSummary {
  _id: string;
  title: string;
  fee: number;
  destinationCity?: string;
  thumbnail?: string;
}

interface IBooking {
  _id: string;
  tour: ITourSummary;
  user: IUserSummary;
  guide: IUserSummary;
  date: string;
  time: string;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "DECLINED";
  paymentStatus?: string;
  createdAt: string;
}

interface IPayment {
  _id: string;
  booking: {
    _id: string;
    user: IUserSummary;
    tour: ITourSummary;
  };
  amount: number;
  status: "PAID" | "UNPAID" | "FAILED";
  createdAt: string;
}

interface IRevenueItem {
  date: string;
  total: number;
}

interface ITopGuide {
  _id: string;
  earnings: number;
  bookingsCount: number;
  guide: IUserSummary;
}

interface ITopTour {
  _id: string;
  bookingsCount: number;
  tour: ITourSummary;
}

interface IDashboardData {
  summary: {
    totalUsers: number;
    totalTours: number;
    totalBookings: number;
    totalRevenue: number;
  };
  counts: {
    bookings: {
      confirmed: number;
      pending: number;
      completed: number;
      cancelled: number;
    };
    newUsersLast7: number;
    newUsersLast30: number;
    newToursLast30: number;
  };
  recent: {
    bookings: IBooking[];
    payments: IPayment[];
  };
  bookingsByStatus: Record<string, number>;
  revenueSeries: IRevenueItem[];
  topGuidesByEarnings: ITopGuide[];
  topToursByBookings: ITopTour[];
}

// --- 2. UTILS & CONFIG ---

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "#22c55e", // green-500
  PENDING: "#eab308",   // yellow-500
  COMPLETED: "#3b82f6", // blue-500
  CANCELLED: "#ef4444", // red-500
  DECLINED: "#64748b",  // slate-500
};

const getBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "PAID":
    case "COMPLETED":
    case "CONFIRMED":
      return "default"; // Usually black/primary
    case "PENDING":
    case "UNPAID":
      return "secondary"; // Gray/Yellow tint
    case "CANCELLED":
    case "DECLINED":
    case "FAILED":
      return "destructive"; // Red
    default:
      return "outline";
  }
};

// --- 3. MAIN COMPONENT ---

const AdminDashboardPage = () => {
  // State to handle client-side data fetching
  const [data, setData] = useState<IDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getAdminStaticData();
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading Dashboard...</div>;
  }

  if (!data) {
    return <div className="p-8 text-center text-red-500">Error loading dashboard data.</div>;
  }

  // Transform bookingsByStatus for Recharts Pie Chart
  const pieData = Object.entries(data.bookingsByStatus).map(([name, value]) => ({
    name: name.charAt(0) + name.slice(1).toLowerCase(), // Capitalize
    value,
    color: STATUS_COLORS[name] || "#94a3b8"
  })).filter(item => item.value > 0);

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 bg-gray-50/50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your platform&apos;s performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm bg-white">
            <Activity className="w-3 h-3 mr-2 text-green-600 animate-pulse" />
            Live Updates
          </Badge>
        </div>
      </div>

      <Separator />

      {/* 1. KPI Cards Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value={formatCurrency(data.summary.totalRevenue)}
          icon={DollarSign}
          trend={`+${formatCurrency(data.summary.totalRevenue)} this month`} // Example trend logic
          trendUp={true}
          className="border-l-4 border-l-green-500"
        />
        <KpiCard
          title="Total Bookings"
          value={data.summary.totalBookings.toString()}
          icon={CalendarCheck}
          trend={`${data.counts.bookings.pending} pending approval`}
          trendUp={null} // Neutral
          className="border-l-4 border-l-blue-500"
        />
        <KpiCard
          title="Active Users"
          value={data.summary.totalUsers.toString()}
          icon={Users}
          trend={`+${data.counts.newUsersLast7} in last 7 days`}
          trendUp={true}
          className="border-l-4 border-l-purple-500"
        />
        <KpiCard
          title="Total Tours"
          value={data.summary.totalTours.toString()}
          icon={MapIcon}
          trend={`+${data.counts.newToursLast30} new this month`}
          trendUp={true}
          className="border-l-4 border-l-orange-500"
        />
      </div>

      {/* 2. Charts Section */}
      <div className="grid gap-4 md:grid-cols-7">

        {/* Revenue Area Chart */}
        <Card className="md:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Daily revenue for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.revenueSeries}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(value: any) => `$${value}`}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Booking Status Pie Chart */}
        <Card className="md:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Booking Distribution</CardTitle>
            <CardDescription>Current status of all bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Recent Activity Lists */}
      <div className="grid gap-4 md:grid-cols-2">

        {/* Recent Bookings */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest 5 booking activities</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead>Tour & User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recent.bookings.slice(0, 5).map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <div className="font-medium truncate max-w-[150px]">{booking.tour.title}</div>
                      <div className="text-xs text-muted-foreground">{booking.user.name}</div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(booking.createdAt)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(booking.totalPrice)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getBadgeVariant(booking.status)} className="scale-90">
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Guides */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Top Performing Guides</CardTitle>
            <CardDescription>Highest earners this month</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead>Guide</TableHead>
                  <TableHead className="text-center">Bookings</TableHead>
                  <TableHead className="text-right">Earnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topGuidesByEarnings.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.guide.picture} />
                        <AvatarFallback>{item.guide.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{item.guide.name}</span>
                        <span className="text-xs text-muted-foreground">{item.guide.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{item.bookingsCount}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600">
                      {formatCurrency(item.earnings)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// --- 4. SUB-COMPONENTS ---

function KpiCard({ title, value, icon: Icon, trend, trendUp, className }: any) {
  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs flex items-center mt-1 text-muted-foreground">
            {trendUp === true && <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />}
            {trendUp === false && <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />}
            <span className={trendUp === true ? "text-green-600" : trendUp === false ? "text-red-600" : ""}>
              {trend}
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminDashboardPage;