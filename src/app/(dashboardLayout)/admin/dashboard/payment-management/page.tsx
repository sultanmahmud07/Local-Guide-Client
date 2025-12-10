import PaymentTable from "@/components/module/Admin/Payment/PaymentTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyPayments } from "@/services/payment/InitialPayment";
import { IPayment } from "@/types/payment.interface";
import { Suspense } from "react";
interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}
export default async function PaymentManagementPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const queryString = queryStringFormatter(params);
  const response = await getMyPayments(queryString);
  const payments: IPayment[] = response?.data || [];
  // console.log("My Booking :::", response.data)
  const meta = response?.meta;
  const totalPages = Math.ceil((meta?.total || 1) / (meta?.limit || 1));
  return (
    <div className="">
      <div>
        <h1 className="text-3xl font-bold mb-4">Booking Management</h1>
      </div>
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <PaymentTable payments={payments} />
        <TablePagination
          currentPage={meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
}
