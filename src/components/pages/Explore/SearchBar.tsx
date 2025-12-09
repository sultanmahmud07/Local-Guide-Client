/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
      const router = useRouter();
      const searchParams = useSearchParams();

      // 1. Initialize state with the current 'search' param value, or default to empty string
      const initialQuery = searchParams.get('search') || "";
      const [query, setQuery] = useState(initialQuery);

      // 2. Handler to update the URL parameter and navigate
      const handleSearch = () => {
            // Copy current search params to preserve any existing parameters
            const params = new URLSearchParams(searchParams.toString());

            if (query.trim()) {
                  // Set the input value to the 'search' parameter
                  params.set('search', query.trim());
            } else {
                  // Remove the 'search' parameter if the input is empty
                  params.delete('search');
            }

            // Navigate to the /explore page with the updated search string
            // e.g., /explore?search=Dhaka
            router.push(`/explore?${params.toString()}`);
      };

      // Optional: Update the input state if searchParams change (e.g., user hits back button)
      useEffect(() => {
            const currentParam = searchParams.get('search') || "";
            // Only update the state if it's different to prevent resetting cursor position
            if (query !== currentParam) {
                  setQuery(currentParam);
            }
      }, [searchParams]);


      // Allow search on Enter key press
      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                  handleSearch();
            }
      };


      return (
            <div className="relative w-full max-w-xl mx-auto">
                  <Input
                        type="text"
                        placeholder="Where are you going?"
                        className="pl-4 pr-12 py-6 text-lg rounded-xl shadow-lg bg-white"
                        value={query} // Bind input value to state
                        onChange={(e) => setQuery(e.target.value)} // Update state on change
                        onKeyDown={handleKeyDown} // Handle Enter key
                  />

                  <Button
                        size="icon"
                        onClick={handleSearch} // Call the new handler
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary hover:bg-secondary transition text-white"
                  >
                        <Search className="h-5 w-5" />
                  </Button>
            </div>
      );
}