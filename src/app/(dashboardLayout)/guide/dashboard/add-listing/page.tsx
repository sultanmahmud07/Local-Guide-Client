import AddTourForm from "@/components/module/Guid/GuideListing/AddTourForm";
import Image from "next/image";
import img from "../../../../../../public/guide/add-tour-image.jpg"

export default async function CreateTour() {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add tour</h1>
        <Image
          alt="create-tour-image"
          src={img}
          height={500}
          width={1400}
          className="w-full object-cover h-40 rounded-lg shadow"
        />
      </div>

      <AddTourForm />
    </div>
  );
}
