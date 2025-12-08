"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; // New Import
import { BOOKING_STATUS, IBooking, PAYMENT_STATUS } from "@/types/booking.interface";
import { format } from "date-fns";
import { useState } from "react";
import TourReviewDialog from "./TourReviewDialog";
import { CheckCircle, Clock, XCircle } from "lucide-react"; // Icons for Status
import PayNowButton from "@/components/shared/PaymentButton";
import ReviewCard from "./ReviewCard";

export default function TouristBookingDetailView({ booking }: { booking: IBooking }) {
      const [reviewOpen, setReviewOpen] = useState(false);

      // Helper function to determine badge styling
      const getBookingStatusBadge = (status: BOOKING_STATUS) => {
            switch (status) {
                  case BOOKING_STATUS.CONFIRMED:
                  case BOOKING_STATUS.COMPLETED:
                        return { variant: "default", color: "bg-green-500 hover:bg-green-600", icon: <CheckCircle className="w-3 h-3 mr-1" /> };
                  case BOOKING_STATUS.DECLINED:
                  case BOOKING_STATUS.CANCELLED:
                        return { variant: "destructive", color: "bg-red-500 hover:bg-red-600", icon: <XCircle className="w-3 h-3 mr-1" /> };
                  case BOOKING_STATUS.PENDING:
                  default:
                        return { variant: "secondary", color: "bg-yellow-500 hover:bg-yellow-600", icon: <Clock className="w-3 h-3 mr-1" /> };
            }
      };

      const statusStyle = getBookingStatusBadge(booking.status);

      return (
            <Card className=" rounded">
                  <CardHeader>
                        <CardTitle className="text-3xl font-bold">Booking #{booking._id.slice(-6)}</CardTitle>
                        <div className="flex items-center space-x-2">
                              <p className="text-sm text-muted-foreground">Status:</p>
                              <Badge className={`uppercase ${statusStyle.color}`}>
                                    {statusStyle.icon}
                                    {booking.status}
                              </Badge>
                        </div>
                  </CardHeader>

                  <CardContent className="space-y-8">

                        {/* === 1. Core Details: Tour, Traveller, Guide === */}
                        <section>
                              <h2 className="text-xl font-semibold mb-4">Core Information</h2>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <DetailSection title="Tour">
                                          <p className="font-medium text-lg">{booking.tour?.title}</p>
                                          <p className="text-sm text-muted-foreground">{booking.tour?.destinationCity}</p>
                                          <p className="text-sm text-gray-700 font-semibold mt-2">Fee: <span className="text-lg">${booking.tour?.fee}</span></p>
                                    </DetailSection>

                                    <DetailSection title="Traveller">
                                          <p className="font-medium">{booking.user?.name}</p>
                                          <p className="text-sm text-muted-foreground">{booking.user?.email}</p>
                                          <p className="text-sm text-gray-700">{booking.phone}</p>
                                    </DetailSection>

                                    <DetailSection title="Guide">
                                          <p className="font-medium">{booking.guide?.name}</p>
                                          <p className="text-sm text-muted-foreground">{booking.guide?.email}</p>
                                    </DetailSection>
                              </div>
                        </section>

                        <Separator />

                        {/* === 2. Scheduling & Payment === */}
                        <section>
                              <h2 className="text-xl font-semibold mb-4">Scheduling & Payment</h2>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <DetailSection title="Date">
                                          <p className="font-semibold text-base">{format(new Date(booking.date), "PPP")}</p>
                                    </DetailSection>

                                    <DetailSection title="Time">
                                          <p className="font-semibold text-base">{booking.time}</p>
                                    </DetailSection>

                                    <DetailSection title="Group Size">
                                          <p className="font-semibold text-base">{booking.groupSize}</p>
                                    </DetailSection>

                                    <DetailSection title="Payment">
                                          <Badge
                                                className="uppercase"
                                                variant={booking.paymentStatus === "PAID" ? "default" : "destructive"}
                                          >
                                                {booking.paymentStatus}
                                          </Badge>
                                    </DetailSection>
                              </div>
                        </section>

                        <Separator />

                        {/* === 3. Special Notes === */}
                        <section>
                              <h2 className="text-xl font-semibold mb-4">Special Notes</h2>
                              <div className="border p-4 rounded-lg bg-gray-50/50">
                                    <p className="text-base text-gray-700 italic">
                                          {booking.notes || "No special notes provided."}
                                    </p>
                              </div>
                        </section>

                        <Separator />

                        {/* === 4. Status History (Timeline Look) === */}
                        <section>
                              <h2 className="text-xl font-semibold mb-4">Status History</h2>
                              <div className="space-y-4">
                                    {booking.statusLogs.map((log) => (
                                          <div
                                                key={log._id}
                                                className="flex items-center justify-between p-3 border-l-4 border-l-gray-300 hover:bg-gray-50 transition-colors rounded-r-md"
                                          >
                                                <div className="flex items-center space-x-3">
                                                      <div className="w-2 h-2 rounded-full bg-gray-600 -ml-[5px]"></div>
                                                      <span className="font-medium capitalize text-gray-800">{log.status.toLowerCase().replace(/_/g, ' ')}</span>
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                      {format(new Date(log.timestamp), "MMM dd, yyyy h:mm a")}
                                                </span>
                                          </div>
                                    ))}
                              </div>
                        </section>

                        <div className="pt-4 flex justify-between gap-3.5">

                              {booking.status === BOOKING_STATUS.CONFIRMED &&
                                    booking.paymentStatus !== PAYMENT_STATUS.PAID && (
                                          <div className="mt-4">
                                                <PayNowButton bookingId={booking._id} />
                                          </div>
                                    )}

                              {/* === ⭐ Review Button if Completed === */}
                              {booking.status === BOOKING_STATUS.COMPLETED && !booking?.review && (
                                    <Button
                                          size="lg"
                                          className="p-4 bg-yellow-500 hover:bg-yellow-600 text-white"
                                          onClick={() => setReviewOpen(true)}
                                    >
                                          ⭐ Submit Tour Review
                                    </Button>
                              )}
                        </div>
                        <div className="review-card mt-6">
                              {/* === View Review Card if Review Exists === */}
                              {booking.review && (
                                    // Assume booking.review is already populated with the necessary fields
                                    <ReviewCard review={booking.review} />
                              )}
                        </div>
                  </CardContent>

                  {/* Review Dialog (keep this outside the main view for modals) */}
                  <TourReviewDialog
                        open={reviewOpen}
                        bookingId={booking._id}
                        tourId={booking.tour._id}
                        guideId={booking.guide._id}
                        onClose={() => setReviewOpen(false)}
                  />
            </Card>
      );
}

// Simplified DetailSection for clean, semantic structure
function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
      return (
            <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                  {children}
            </div>
      );
}