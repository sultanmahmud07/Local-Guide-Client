// app/guide/dashboard/my-listing/[id]/page.tsx
import UpdateTourForm from "@/components/module/Guid/GuideListing/AddOrEditTourForm";
import { getTourBySlug } from "@/services/guide/guideListing.services";

export default async function EditTourPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tourData = await getTourBySlug(id); // must return tour object (or throw)

  // ensure we pass plain JSON-serializable data
  return (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Edit Tour</h1>
        {/* <EditTourClient tour={tourData.data ?? tourData} /> */}
        <UpdateTourForm id={tourData?.data?._id} initialData={tourData.data ?? tourData} />
      </div>
    </div>
  );
}
