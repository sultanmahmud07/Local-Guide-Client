import SearchBar from "../Explore/SearchBar";

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
        <SearchBar />
      </div>
    </section>
  );
}