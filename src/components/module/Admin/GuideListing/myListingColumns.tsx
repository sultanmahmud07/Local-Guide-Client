import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { ITour } from "@/types/booking.interface";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export const myListingColumns: Column<ITour>[] = [
  {
    header: "Title",
    accessor: (tour) => (
      <div className="flex items-center gap-3">
        {tour.images?.length > 0 ? (
          <Image src={tour.images[0]} alt={tour.title} height={100} width={100} className="w-20 h-12 object-cover rounded" />
        ) : (
          <div className="w-20 h-12 bg-muted/30 rounded" />
        )}

        <div>
          
        <Link href={`/tour/${tour.slug}`}>
          <p className="font-medium hover:text-primary cursor-pointer">{tour.title.slice(0, 30)} ..</p>
        </Link>
          <p className="text-xs text-muted-foreground">{tour.slug.slice(0, 20)}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Destination",
    accessor: (tour) => (
      <div>
        <p className="font-medium ">{tour.destinationCity.slice(0, 30) || "—"}</p>
        <p className="text-xs text-muted-foreground">{tour.category}</p>
      </div>
    ),
  },
  {
    header: "Fee",
    accessor: (tour) => <div>${tour.fee ?? 0}</div>,
    sortKey: "fee",
  },
  {
    header: "Group Size",
    accessor: (tour) => <div>{tour.maxGroupSize ?? "-"}</div>,
    sortKey: "maxGroupSize",
  },
  {
    header: "Status",
    accessor: (tour) => {
      const label = tour.status ?? "N/A";
      const cls =
        label === "PUBLIC"
          ? "bg-green-50 text-green-800"
          : label === "PRIVATE"
          ? "bg-gray-50 text-gray-800"
          : "bg-yellow-50 text-yellow-800";
      return (
        <Badge variant="outline" className={cls}>
          {label}
        </Badge>
      );
    },
  },
  {
    header: "Active",
    accessor: (tour) =>
      tour.isActive ? (
        <Badge variant="default" className="bg-green-600">
          Active
        </Badge>
      ) : (
        <Badge variant="outline">Inactive</Badge>
      ),
  },
  {
    header: "Created",
    accessor: (tour) => (
      <div className="text-sm text-muted-foreground">
        {tour.createdAt ? format(new Date(tour.createdAt), "MMM d, yyyy") : "-"}
      </div>
    ),
    sortKey: "createdAt",
  },
];
