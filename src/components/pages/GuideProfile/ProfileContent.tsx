// components/profile/profile-content.tsx

import Image from "next/image";
import { Link2 } from "lucide-react"; 

// Interface (assuming it's imported or defined here)
interface GuideProfile {
  name: string;
  bio: string;
  imageUrl: string;
}

const ProfileContent = ({ guide }: { guide: GuideProfile }) => {
  return (
    <div className="space-y-6">
      {/* --- Intro Greeting --- */}
      <h1 className="text-3xl font-bold text-gray-800">
        Hi there! Nice to meet you
      </h1>

      {/* --- Main Image --- */}
      <div className="w-full max-w-lg md:max-w-xl mx-auto md:mx-0">
        <Image
          src={guide.imageUrl}
          alt={`Profile photo of ${guide.name}`}
          width={600}
          height={400}
          className="w-full h-auto object-cover rounded-lg shadow-xl"
        />
      </div>

      {/* --- Biography/Text --- */}
      <div className="text-base text-gray-700 leading-relaxed space-y-4">
        <p className="whitespace-pre-line">
          {guide.bio}
          <a href="#" className="text-green-600 font-semibold ml-1"> {/* Updated color */}
            read more
          </a>
        </p>
      </div>

      {/* --- Share Profile Link --- */}
      <div className="pt-4">
        <a href="#" className="flex items-center text-green-600 hover:text-green-800 font-semibold transition-colors"> {/* Updated color */}
          <Link2 className="w-4 h-4 mr-1 transform rotate-90" />
          Share profile
        </a>
      </div>

    </div>
  );
};

export default ProfileContent;