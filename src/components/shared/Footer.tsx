import {
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLogoInstagram, IoLocationSharp } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#073642] text-white mt-12">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-[#073642]">
                {/* small mark, replace with svg if you have */}
                <span className="font-bold">%</span>
              </div>
              <div className="text-2xl font-extrabold tracking-tight">Buster</div>
            </div>
            <p className="text-[#cbd5d5] leading-relaxed max-w-88">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
            </p>

            {/* Social icons (small) */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-3 bg-[#0f3b44] rounded-md hover:scale-105 transition">
                <FaFacebookF className="text-white" />
              </a>
              <a href="#" className="p-3 bg-[#0f3b44] rounded-md hover:scale-105 transition">
                <IoLogoInstagram className="text-white" />
              </a>
              <a href="#" className="p-3 bg-[#0f3b44] rounded-md hover:scale-105 transition">
                <FaLinkedinIn className="text-white" />
              </a>
              <a href="#" className="p-3 bg-[#0f3b44] rounded-md hover:scale-105 transition">
                <FaYoutube className="text-white" />
              </a>
            </div>
          </div>

          {/* Popular Destination (two columns inside) */}
          <div className="md:col-span-1 grid grid-cols-2 gap-4">
            <div>
              <h6 className="text-lg font-semibold mb-4">Popular Destination</h6>
              <ul className="space-y-3 text-[#cbd5d5]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-yellow-400">▸</span>
                  <span>Bali Indonesia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-yellow-400">▸</span>
                  <span>Cappadocia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-yellow-400">▸</span>
                  <span>Maldives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-yellow-400">▸</span>
                  <span>Bromo</span>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="text-lg font-semibold mb-4 invisible md:visible">.</h6>
              <ul className="space-y-3 text-[#cbd5d5]">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-yellow-400">▸</span>
                  <span>Bali Indonesia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-yellow-400">▸</span>
                  <span>Cappadocia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-yellow-400">▸</span>
                  <span>Maldives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-yellow-400">▸</span>
                  <span>Bromo</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Addresses */}
          <div className="space-y-5">
            <h6 className="text-lg font-semibold">Head Quarter Address</h6>
            <div className="text-[#cbd5d5]">
              <p>Lumbung Hidup St. 425 East</p>
              <p>Java Madiun City Indonesia</p>
            </div>

            <h6 className="text-lg font-semibold mt-4">Secondary Branch</h6>
            <div className="text-[#cbd5d5]">
              <p>Gresik United East Java</p>
              <p>Nggpeng Village 07 Indonesia</p>
            </div>
          </div>

          {/* Newsletter / Get Latest Update */}
          <div className="space-y-4">
            <h6 className="text-lg font-semibold">Get Latest Update</h6>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-sm text-[#073642] focus:outline-none"
              />

              <button
                className="w-full bg-yellow-400 text-[#073642] py-3 font-semibold tracking-wider rounded-sm hover:opacity-95 transition"
              >
                GET AN OFFER
              </button>
            </div>
          </div>
        </div>

        {/* dotted divider */}
        <div className="border-t border-dashed border-[#0e3941] my-8" />

        {/* bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs uppercase tracking-widest text-[#cbd5d5]">
            Allright Reserved - Dirastudio Elementor Kit Template
          </p>

          <div className="flex items-center gap-3">
            <a href="#" className="p-2 bg-[#10444b] rounded shadow flex items-center justify-center">
              <FaFacebookF className="text-white" />
            </a>
            <a href="#" className="p-2 bg-[#10444b] rounded shadow flex items-center justify-center">
              <FaFacebookF className="text-white" />
            </a>
            <a href="#" className="p-2 bg-[#10444b] rounded shadow flex items-center justify-center">
              <FaLinkedinIn className="text-white" />
            </a>
            <a href="#" className="p-2 bg-[#10444b] rounded shadow flex items-center justify-center">
              <FaYoutube className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
