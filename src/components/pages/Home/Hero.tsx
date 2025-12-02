"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/home/banner-bg.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Customizable Private Tours with Local Tour Guides
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Choose Local Tour Guides at the Destination of Your Choice. Simply
          Message Them To Personalize Your Tour!
        </p>

        {/* Search Box */}
        <div className="relative max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Where to?"
            className="pl-4 pr-12 py-6 text-lg rounded-xl shadow-lg bg-white"
          />

          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary hover:bg-secondary transition text-white"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
