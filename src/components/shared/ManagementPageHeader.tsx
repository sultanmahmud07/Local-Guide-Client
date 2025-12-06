"use client";
import { LucideIcon, Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface ManagementPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    icon?: LucideIcon;
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
}

const ManagementPageHeader = ({
  title,
  action,
  children,
}: ManagementPageHeaderProps) => {
  const Icon = action?.icon || Plus;
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">{title}</h1>
      {action && (
        <Button onClick={action.onClick} className="cursor-pointer ">
          <Icon className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
};

export default ManagementPageHeader;
