import CreateAdminForm from "@/components/module/Admin/CreateAdminForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Admin | Dashboard",
  description: "Create a new administrator account",
};

export default function MakeAdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-gray-900">Create Admin</h1>
        <p className="text-gray-500">
            Add a new administrator to help manage the platform.
        </p>
      </div>
      
      {/* The interactive form component */}
      <CreateAdminForm />
    </div>
  );
}