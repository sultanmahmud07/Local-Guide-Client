"use client";
import Image from "next/image";
import Link from "next/link";

const ImpactHero = () => {
  return (
    <section className="w-full bg-amber-50  py-10 md:py-16">
      <div className="mx-auto w-[92%] max-w-[1200px] grid gap-10 grid-cols-1 lg:grid-cols-[1fr_520px] items-center">

        {/* LEFT PANEL */}
        <div className="relative rounded-2xl p-8 md:p-12 bg-emerald-900 text-white overflow-hidden">
          
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logo/site-logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="bg-white/25 p-2 rounded-2xl"
            />
          </div>

          {/* Title */}
          <h1 className="font-oswald font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            Discover the city with{" "}
            <span className="text-amber-400">local guides</span>
          </h1>

          {/* Description */}
          <p className="text-white/90 mt-6 max-w-[60ch] text-sm md:text-base leading-relaxed">
            Join small group tours led by real locals — taste authentic food,
            uncover hidden gems, and support local communities while exploring
            the city in an unforgettable way.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center rounded-lg bg-amber-100 text-rose-700 px-5 py-3 shadow-md font-semibold"
            >
              Explore Tours
            </Link>
            <a
              href="/explore?type=guide"
              className="inline-flex items-center rounded-lg border border-white/20 text-white px-4 py-3 font-medium"
            >
              Meet Guides
            </a>
          </div>

          {/* Chat Button */}
          <button
            aria-label="Chat"
            className="absolute left-4 bottom-[-18px] transform translate-y-1/2 w-14 h-14 rounded-xl bg-amber-50 shadow-md flex items-center justify-center text-2xl"
            onClick={() => alert("Chat widget will open here")}
          >
            💬
          </button>
        </div>

        {/* RIGHT CARD SECTION */}
        <div className="relative h-[520px] flex items-center justify-center">

          {/* Back Layer */}
          <div className="hidden md:block absolute right-4 top-4 w-[420px] h-[480px] rounded-2xl bg-amber-400 rotate-[-5deg] shadow-lg" />

          {/* Card */}
          <article className="relative z-10 w-[360px] md:w-[380px] bg-yellow-50 rounded-xl p-5 md:p-6 shadow-xl rotate-1">
            <div className="grid gap-3 grid-cols-[84px_1fr] grid-rows-[repeat(4,auto)]">

              {/* Square logo */}
              <div className="row-span-2 rounded-lg overflow-hidden bg-secondary flex items-center justify-center">
                <Image
                  src="/logo/site-logo.png"
                  alt="Brand"
                  width={70}
                  height={70}
                  className="object-cover bg-white p-2 rounded-md"
                />
              </div>

              {/* Tall image */}
              <div className="rounded-lg overflow-hidden row-span-2">
                <Image
                  src="/home/impact-1.jpg"
                  alt="Food"
                  width={300}
                  height={300}
                  className="object-cover aspect-square w-full h-full"
                />
              </div>

              {/* Small image */}
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/home/impact-2.jpg"
                  alt="City"
                  width={200}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Wide image */}
              <div className="rounded-lg overflow-hidden col-start-2">
                <Image
                  src="/home/impact-3.jpg"
                  alt="People"
                  width={300}
                  height={200}
                  className="object-cover aspect-square w-full h-full"
                />
              </div>

            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-black/10 text-center">
              <h3 className="text-lg md:text-xl font-semibold text-emerald-800">
                Local Guide Picks
              </h3>
              <p className="text-sm text-emerald-600">
                Small groups • Big memories
              </p>
            </div>
          </article>
        </div>

      </div>
    </section>
  );
};

export default ImpactHero;
