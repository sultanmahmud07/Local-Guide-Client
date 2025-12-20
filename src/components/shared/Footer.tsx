import Image from "next/image";
import Link from "next/link";
import {
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import NewsletterForm from "./NewsLatterForm";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#023047] text-white mt-12">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand / About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-40 bg-white">
                <Image
                  src="/logo/site-logo.png"
                  alt="NativeWays logo"
                  width={100}
                  height={100}
                  className="wi"
                />
              </div>
              <div>
                <div className="text-2xl font-extrabold tracking-tight">NativeWays</div>
                <div className="text-sm text-[#c7d8d4]">Local experiences guided by locals — explore, book and discover.</div>
              </div>
            </div>

            <p className="text-[#c7d8d4] leading-relaxed max-w-[320px]">
              NativeWays connects travellers with passionate local guides. Create unforgettable, authentic trips — one neighbourhood at a time.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a aria-label="Facebook" href="#" className="p-2 bg-[#01414a] rounded-md hover:scale-105 transition">
                <FaFacebookF className="text-white" />
              </a>
              <a aria-label="Instagram" href="#" className="p-2 bg-[#01414a] rounded-md hover:scale-105 transition">
                <IoLogoInstagram className="text-white" />
              </a>
              <a aria-label="LinkedIn" href="#" className="p-2 bg-[#01414a] rounded-md hover:scale-105 transition">
                <FaLinkedinIn className="text-white" />
              </a>
              <a aria-label="YouTube" href="#" className="p-2 bg-[#01414a] rounded-md hover:scale-105 transition">
                <FaYoutube className="text-white" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Explore</h6>
            <ul className="space-y-3 text-[#c7d8d4]">
              <li>
                <Link href="/explore" className="hover:text-white transition">Explore Tours</Link>
              </li>
              <li>
                <Link href="/explore?type=guide" className="hover:text-white transition">Find Local Guides</Link>
              </li>
              <li>
                <Link href="/become-a-guide" className="hover:text-white transition">Become a Guide</Link>
              </li>
              <li>
                <Link href="/my-booking" className="hover:text-white transition">My Bookings</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="text-lg font-semibold mb-4">Company</h6>
            <ul className="space-y-3 text-[#c7d8d4]">
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div className="space-y-4">
            <h6 className="text-lg font-semibold">Contact</h6>

            <div className="text-[#c7d8d4] space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#14a800]"><IoLocationSharp /></div>
                <div>
                  <div className="font-medium text-white">Head Office</div>
                  <div>Banani, Dhaka, Bangladesh</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#14a800]"><FaPhoneAlt /></div>
                <div>
                  <div className="font-medium text-white">Phone</div>
                  <a href="tel:+8801327357894" className="text-[#c7d8d4] hover:text-white">+880 1327 357894</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#14a800]"><MdEmail /></div>
                <div>
                  <div className="font-medium text-white">Email</div>
                  <a href="mailto:hello@nativeways.com" className="text-[#c7d8d4] hover:text-white">hello@nativeways.com</a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h6 className="text-sm font-semibold mb-2">Get updates & offers</h6>
             <NewsletterForm />
              <p className="text-xs text-[#9fb4b0] mt-2">No spam — unsubscribe anytime.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#0f4b52] my-8" />

        {/* bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs uppercase tracking-widest text-[#b8d1cf]">
            © {currentYear} NativeWays — All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <Link href="/privacy-policy" className="text-xs text-[#b8d1cf] hover:text-white">Privacy</Link>
            <span className="text-[#0f4b52]">|</span>
            <Link href="/terms" className="text-xs text-[#b8d1cf] hover:text-white">Terms</Link>
            <span className="hidden md:inline-block w-px h-6 bg-[#0f4b52] mx-3" />
            <div className="flex items-center gap-2">
              <a href="#" aria-label="Facebook" className="p-2 bg-[#01414a] rounded shadow flex items-center justify-center">
                <FaFacebookF className="text-white" />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 bg-[#01414a] rounded shadow flex items-center justify-center">
                <IoLogoInstagram className="text-white" />
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 bg-[#01414a] rounded shadow flex items-center justify-center">
                <FaLinkedinIn className="text-white" />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 bg-[#01414a] rounded shadow flex items-center justify-center">
                <FaYoutube className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
