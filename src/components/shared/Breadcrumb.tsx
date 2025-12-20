import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi";

const Breadcrumb = ({title}:{title: string}) => {
  return (
    <div className="w-full py-4">
      <nav className="main-container flex items-center gap-2 text-[15px]">
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
        <Link href="/explore" className="text-gray-700 hover:text-black">
          Tours
        </Link>

        <HiChevronRight className="text-gray-400" />

        {/* Final (active) item */}
        <span className="text-gray-500 font-semibold hidden md:block">
         {title}
        </span>
        <span className="text-primary font-semibold md:block">
         {title.slice(0,20)}{title.length > 20 ? "..." : ""}
        </span>
      </nav>
    </div>
  );
};

export default Breadcrumb;
