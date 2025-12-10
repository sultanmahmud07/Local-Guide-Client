"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/lib/auth-utils";
import { IUser } from "@/types/user.interface";
import { format } from "date-fns";
import { ShieldCheck, XCircle } from "lucide-react";
import Image from "next/image";

export const userColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 relative rounded-full overflow-hidden border border-gray-200">
          <Image 
            src={row.picture || "/default-avatar.png"} 
            alt={row.name} 
            fill 
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
    sortKey: "name",
  },
  {
    header: "Role",
    accessor: (row) => {
      const roleColors: Record<UserRole, string> = {
        SUPER_ADMIN: "bg-purple-100 text-purple-800 border-purple-200",
        ADMIN: "bg-indigo-100 text-indigo-800 border-indigo-200",
        GUIDE: "bg-emerald-100 text-emerald-800 border-emerald-200",
        TOURIST: "bg-blue-50 text-blue-700 border-blue-200",
      };
      return (
        <Badge variant="outline" className={`border ${roleColors[row.role] || "bg-gray-100"}`}>
          {row.role.replace("_", " ")}
        </Badge>
      );
    },
    sortKey: "role",
  },
  {
    header: "Status",
    accessor: (row) => (
      <Badge variant={row.isActive === "ACTIVE" ? "default" : "destructive"} className="text-xs">
        {row.isActive}
      </Badge>
    ),
    sortKey: "isActive",
  },
  {
    header: "Verified",
    accessor: (row) => (
      <div className="flex items-center">
        {row.isVerified ? (
          <ShieldCheck className="w-5 h-5 text-blue-500" />
        ) : (
          <XCircle className="w-5 h-5 text-gray-300" />
        )}
      </div>
    ),
  },
  {
    header: "Joined",
    accessor: (row) => (
      <span className="text-sm text-gray-500">
        {format(new Date(row.createdAt), "MMM d, yyyy")}
      </span>
    ),
    sortKey: "createdAt",
  },
];