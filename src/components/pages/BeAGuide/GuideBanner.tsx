import Image from "next/image";
import Link from "next/link";

const GuideBanner = () => {
  return (
    <section className="relative pt-20 w-full h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <Image
        src="/home/banner-bg.jpg"
        alt="Become a Local Guide"
        fill
        className="object-cover"
        priority
      />

      {/* Color Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-secondary/70 via-secondary/40 to-secondary/20"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white font-oswald mb-4 uppercase">
          Sign Up as a Local
        </h1>

        <p className="text-white text-lg md:text-2xl font-light mb-8">
          Show travellers around & make extra money
        </p>

        <Link href="/registration">
          <button className="px-8 py-4 bg-secondary text-white font-semibold text-lg rounded-md shadow-lg hover:bg-primary/90 transition">
            Sign Up as a Local
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GuideBanner;
