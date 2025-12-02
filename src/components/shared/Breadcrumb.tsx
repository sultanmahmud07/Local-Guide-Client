import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi";

const Breadcrumb = () => {
  return (
    <div className="w-full py-4">
      <nav className="main-container flex items-center gap-2 text-[15px]">

        {/* Home Icon Box */}
        <Link
          href="/"
          className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 
                     hover:bg-gray-200 transition"
        >
          <FiHome size={16} className="text-gray-700" />
        </Link>

        {/* Separator */}
        <HiChevronRight className="text-gray-400" />

        {/* Links */}
        <Link href="/tours" className="text-gray-700 hover:text-black">
          Tours
        </Link>

        <HiChevronRight className="text-gray-400" />

        <Link href="/tours/netherlands" className="text-gray-700 hover:text-black">
          Netherlands
        </Link>

        <HiChevronRight className="text-gray-400" />

        <Link href="/tours/netherlands/amsterdam" className="text-gray-700 hover:text-black">
          Amsterdam
        </Link>

        <HiChevronRight className="text-gray-400" />

        {/* Final (active) item */}
        <span className="text-black font-semibold">
          Highlights Of Amsterdam Private Walking Tour
        </span>
      </nav>
    </div>
  );
};

export default Breadcrumb;
