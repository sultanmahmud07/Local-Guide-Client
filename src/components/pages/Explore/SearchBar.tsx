"use client";

import { useState } from "react"; // Removed useEffect
import { useRouter } from "next/navigation"; // Removed useSearchParams
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
      const router = useRouter();
      // NOTE: Removed const searchParams = useSearchParams();

      // 1. Initialize state to an empty string, ignoring current URL parameters.
      const [query, setQuery] = useState("");

      // 2. Handler to update the URL parameter and navigate
      const handleSearch = () => {
            // Create a brand NEW URLSearchParams object (no existing params copied)
            const params = new URLSearchParams();

            if (query.trim()) {
                  // Set the input value to the 'search' parameter
                  params.set('search', query.trim());
            } 
            // If query is empty, the search param is simply omitted, as the object is new.

            // Navigate to the /explore page with only the new search string (if present)
            // e.g., /explore or /explore?search=Dhaka
            router.push(`/explore?${params.toString()}`);
      };

      // NOTE: Removed useEffect block entirely

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
                        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary hover:bg-secondary transition text-white"
                  >
                        <Search className="h-5 w-5" />
                        {/* Search */}
                  </Button>
            </div>
      );
}