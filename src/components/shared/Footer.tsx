import { FaYoutube, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="bg-background border-t mt-10 text-sm pt-10">
      <div className="main-container flex flex-col md:flex-row py-5 gap-5 md:gap-14">
        {/* Left Section */}
        <div className="w-full text-muted-foreground md:w-1/3">
          <Image src="/logo/logo.png" alt="logo" height={300} width={300} className="w-28" />
          {/* <p className="pt-2">Building Scalable Web Solutions with Passion.</p> */}
          <p className="pt-2">
            I&apos;m a Full Stack Developer specializing in modern web technologies like
            React, Next.js, Node.js, and Express. I turn ideas into interactive and
            high-performing digital experiences.
          </p>

          <div className="flex items-center gap-3 py-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition text-primary text-xl hover:scale-110"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition text-primary text-xl hover:scale-110"
            >
              <IoLogoInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition text-primary text-xl hover:scale-110"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition text-primary text-xl hover:scale-110"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Menu */}
          <div className="flex flex-col gap-3">
            <h6 className="font-semibold text-xs py-1 uppercase">Menu</h6>
            <ul className="flex flex-col gap-3 text-muted-foreground text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/about">Skills</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h6 className="font-semibold text-xs py-1 uppercase">Quick Links</h6>
            <ul className="flex flex-col gap-3 text-muted-foreground text-sm">
              <li><Link href="/about">My Resume</Link></li>
              <li><Link href="/blogs">Tech Blog</Link></li>
              <li><Link href="/projects">Services</Link></li>
              <li><Link href="/about">Privacy Policy</Link></li>
              <li><Link href="/about">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-3">
            <h6 className="font-semibold text-xs py-1 uppercase">Contact Info</h6>

            <div className="flex gap-3">
              <div className="icon w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                <FaPhoneAlt />
              </div>
              <div className="info">
                <p className="font-semibold">Call Me</p>
                <span className="text-muted-foreground">+880 1327 357894</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="icon w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                <MdEmail />
              </div>
              <div className="info">
                <p className="font-semibold">Email</p>
                <span className="text-muted-foreground">sultan.dev@gmail.com</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="icon w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                <IoLocationSharp />
              </div>
              <div className="info flex-1">
                <p className="font-semibold">Location</p>
                <span className="text-muted-foreground text-sm">
                  Banani, Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="bg-primary text-sm py-3 md:py-4 text-center text-white">
        © {new Date().getFullYear()} Sultan Mahmud — All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
