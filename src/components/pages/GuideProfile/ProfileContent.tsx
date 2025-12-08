import { IGuide } from "@/types/user.interface";

const ProfileContent = ({ guide }: { guide: IGuide }) => {
  return (
    <div className="space-y-6">
      {/* --- Intro Greeting --- */}
      <h1 className="text-3xl font-bold text-gray-800">
        Hi there! I&apos;am {guide.name} and Nice to meet you. 
      </h1>

      {/* --- Main Image --- */}
      {/* <div className="w-full md:mx-0">
        <Image
          src={guide?.picture ? guide?.picture : "/default.png"}
          alt={`Profile photo of ${guide?.name}`}
          width={800}
          height={600}
          className="w-full aspect-square object-cover rounded-lg shadow-xl"
        />
      </div> */}

      {/* --- Biography/Text --- */}
      <div className="text-base text-gray-700 leading-relaxed space-y-4">
        <p className="whitespace-pre-line">
          {guide?.bio}
        </p>
      </div>

    </div>
  );
};

export default ProfileContent;