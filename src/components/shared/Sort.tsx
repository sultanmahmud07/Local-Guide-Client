"use client"; // Required for interactivity (onChange/onClick)

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const Sort = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Get current sort value from URL to set the default option
  const currentSort = searchParams.get('sort') || 'asc';

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = event.target.value;
    
    // Create new params based on current URL
    const params = new URLSearchParams(searchParams);
    
    // Set the 'sort' parameter (e.g., ?sort=desc)
    params.set('sort', sortOrder);

    // Update the URL without reloading the page
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative">
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="
          appearance-none 
          w-full 
          bg-white 
          border border-gray-300 
          text-gray-700 
          py-2 px-4 pr-8 
          rounded-lg 
          leading-tight 
          focus:outline-none focus:bg-white focus:border-blue-500
          cursor-pointer
        "
      >
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
      
      {/* Custom Arrow Icon for the Select Box */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};

export default Sort;