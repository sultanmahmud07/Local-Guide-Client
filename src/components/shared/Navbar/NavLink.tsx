'use client';

import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ComponentProps, useEffect, useState} from 'react';
export default function NavLink({href, className, ...rest}: ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [isSticky, setIsSticky] = useState(false);
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
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        ` ${className}`,
        isActive
          ? `font-semibold ${isSticky ? "text-primary" : "text-primary"} px-2 `
          : `px-2  ${ isSticky ? "text-[#080808]" : "" }`
      )}
      href={href}
      {...rest}
    />
  );
}