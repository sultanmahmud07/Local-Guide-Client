import Link from "next/link";

const GuideCTA = () => {
  return (
    <section className="w-full bg-[#F7F9F4] py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary uppercase tracking-tight">
          You Don’t Need to Be a Professional
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
          All you need is your love for the city, your unique perspective,
          and the joy of meeting people from around the world.  
          NativeWays helps you share your story — and earn doing what you love.
        </p>

        <Link href="/registration">
          <button className="mt-10 px-10 py-4 bg-primary text-white text-lg font-semibold rounded-md shadow-md hover:bg-primary/90 transition-all cursor-pointer">
            Become a Local Guide
          </button>
        </Link>

      </div>
    </section>
  );
};

export default GuideCTA;
