"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Thanks for subscribing!");

    // reset input
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        aria-label="Email for newsletter"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-3 py-2 rounded-md bg-white text-[#073642] outline-none"
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-[#14a800] text-[#023047] font-semibold hover:opacity-95 transition"
      >
        Subscribe
      </button>
    </form>
  );
}
