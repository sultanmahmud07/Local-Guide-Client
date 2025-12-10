import UpdateTourForm from "@/components/module/Guid/GuideListing/AddOrEditTourForm";
import { getTourBySlug } from "@/services/guide/guideListing.services";

export default async function EditTourPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tourData = await getTourBySlug(id);

  return (
    <div className="py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Edit Tour</h1>
        <UpdateTourForm initialData={tourData.data ?? tourData} />
      </div>
    </div>
  );
}
