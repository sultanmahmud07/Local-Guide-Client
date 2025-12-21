"use client"
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IUser } from "@/types/user.interface";
import UserProfileMenu from "./UserProfileMenu";

type Props = {
  accessToken?: string | null;
  userInfo?: IUser | null;
};

const Navbar = (props: Props) => {
  const [navToggle, setNavToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { accessToken, userInfo } = props;

  // Add an effect to prevent background scrolling when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = navToggle ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, [navToggle]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);


    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const navigationLinks = [
    { href: "/explore", label: "Explore Tours", role: "PUBLIC" },
    { href: "/become-a-guide", label: "Become a Guide", role: "PUBLIC" },
  ];

  return (
    <header>
      <nav className={`z-40 fixed top-[-5px] left-0 right-0 w-full shadow py-2 lg:py-1 ${isSticky ? "border-b bg-background" : " bg-white"}`}>
        <div className={`main-container flex justify-between items-center`}>
          {/* Logo side here >>>>>>>>>>>>>>>> */}
          <div className="nav_logo_side">
            <Link className="flex flex-col items-center" href="/">
              <Image
                src="/logo/site-logo.png"
                alt="logo"
                width={200}
                height={100}
                className="w-20"
              />
              {/* <span className="text- text-xs uppercase font-bold">Express BD</span> */}
            </Link>
          </div>

          {/* Right side for desktop (remains unchanged) >>>>>>>>>>>>>>>> */}
          <div className="nav_right_side hidden lg:block ">
            <div className="flex justify-end items-center gap-2">
              {
                navigationLinks.map((link, index) => {
                  return (
                    <NavLink
                      key={index}
                      onClick={() => setNavToggle(false)}
                      href={link.href}
                      className={`
                        relative group flex items-center gap-2 font-semibold text-sm transition-colors duration-300
        after:absolute 
        after:content-[''] 
        after:bg-emerald-600 
        after:h-0.5 
        after:w-0 
        after:left-0 
        after:-bottom-1.5 
        after:transition-all 
        after:duration-300 
        hover:after:w-full
        `}
                    >
                      {link.label}
                    </NavLink>
                  )
                })}
              {accessToken ? (
                <UserProfileMenu userInfo={userInfo} />
              ) :
                <div className="flex items-center gap-2">
                  <Button asChild className="text-sm rounded-none px-7">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="text-sm bg-secondary hover:bg-blue-900 rounded-none px-7">
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              }
            </div>
          </div>

          {/* Mobile Toggle Button and Profile Menu (condensed) */}
          <div className="lg:hidden">
            <div className="flex justify-end items-center gap-2">
              {accessToken && (
                <UserProfileMenu userInfo={userInfo} />
              )}
              {!accessToken && (
                <Button asChild className="text-xs size-8 px-7">
                  <Link href="/login">Login</Link>
                </Button>
              )}

              {/* Toggle Icon */}
              <label className="cursor-pointer z-50">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={navToggle}
                  onChange={() => setNavToggle((prev) => !prev)}
                />
                {navToggle ? (
                  <svg
                    className="fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                ) : (
                  <svg
                    className="fill-current text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* MOBILE NAVIGATION MENU (Responsive Implementation) */}
        {/* ======================================================= */}
        {/* Use navToggle to conditionally apply the 'translate-x-0' or '-translate-x-full' classes */}
        <div
          className={`
            fixed top-[70px] lg:hidden w-full h-full bg-white shadow-xl 
            transition-transform duration-300 ease-in-out transform z-30 p-4 space-y-4
            ${navToggle ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 border-b pb-4">
            {navigationLinks.map((link, index) => (
              <NavLink
                key={index}
                onClick={() => setNavToggle(false)}
                href={link.href}
                className="block text-lg font-medium text-gray-800 hover:text-primary transition p-2 hover:bg-gray-50 rounded-md"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Login/Register Buttons (Only if not logged in) */}
          {!accessToken && (
            <div className="flex flex-col gap-3 pt-4">
              <Button asChild className="w-full text-base py-2 rounded-xs px-4">
                <Link href="/login" onClick={() => setNavToggle(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full text-base py-2 rounded-xs px-4">
                <Link href="/register" onClick={() => setNavToggle(false)}>
                  Register
                </Link>
              </Button>
            </div>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Navbar;