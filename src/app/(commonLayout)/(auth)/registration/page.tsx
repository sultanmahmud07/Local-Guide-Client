// app/guide/register/page.tsx
import Image from "next/image";
import Link from "next/link";
import GuideRegisterForm from "@/components/auth/guide-register-form";

const GuideRegisterPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-14">
      {/* Top hero */}
      <section className="relative bg-linear-to-r from-primary/10 to-secondary/6">
        <div className="main-container mx-auto py-12 md:py-20 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary font-oswald">
                Become a NativeWays Guide
              </h1>
              <p className="mt-4 text-gray-700 max-w-xl leading-relaxed">
                Share your local knowledge, meet travellers from around the world and earn on your schedule.
                Signing up is quick — we will guide you through setting up a great profile and getting your
                first bookings.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link href="/explore" className="inline-block px-5 py-3 bg-secondary text-white rounded-md shadow hover:opacity-95">
                  Explore Tours
                </Link>
                <a href="#register" className="inline-block px-5 py-3 border border-secondary text-secondary rounded-md hover:bg-secondary/5">
                  Start signing up
                </a>
              </div>

              {/* three benefits */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-start gap-3">
                  <svg width="36" height="36" viewBox="0 0 24 24" className="text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15 8H9L12 2Z" fill="#14a800" />
                    <path d="M12 22L9 16H15L12 22Z" fill="#14a800" />
                    <circle cx="12" cy="12" r="2" fill="#14a800" />
                  </svg>
                  <div className="text-sm font-medium text-gray-800">Flexible schedule</div>
                  <div className="text-xs text-gray-500">Choose when you accept bookings — you are in control.</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-start gap-3">
                  <svg width="36" height="36" viewBox="0 0 24 24" className="text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="3" fill="#14a800"/>
                    <path d="M7 12h10" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <div className="text-sm font-medium text-gray-800">Earn more</div>
                  <div className="text-xs text-gray-500">Set your price and increase it as your reviews grow.</div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col items-start gap-3">
                  <svg width="36" height="36" viewBox="0 0 24 24" className="text-primary" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3C8 3 5 6 5 10c0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z" fill="#14a800"/>
                    <circle cx="12" cy="10" r="2" fill="#fff"/>
                  </svg>
                  <div className="text-sm font-medium text-gray-800">Local support</div>
                  <div className="text-xs text-gray-500">We help you with profile tips, reviews & safety resources.</div>
                </div>
              </div>
            </div>

            {/* hero image */}
            <div className="order-1 md:order-2">
              <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
                <Image
                  src="/auth/guide-signup.jpg"
                  alt="Become a local guide"
                  width={800}
                  height={600}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content: form + steps */}
      <section id="register" className="main-container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* left: short steps */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">Quick start</h3>
              <ol className="mt-3 text-sm text-gray-600 space-y-3 list-decimal pl-5">
                <li>Create your account</li>
                <li>Complete your profile & add photos</li>
                <li>Set availability & your price</li>
                <li>Receive requests and host your first guest</li>
              </ol>
              <p className="mt-4 text-xs text-gray-400">Takes less than 10 minutes.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-sm">Need help?</h4>
              <p className="mt-2 text-sm text-gray-600">Contact our guide support for onboarding help and profile tips.</p>
              <a href="mailto:support@nativeways.com" className="mt-4 inline-block text-sm text-secondary hover:underline">support@nativeways.com</a>
            </div>
          </aside>

          {/* form card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
              <h2 className="text-2xl font-semibold text-gray-900">Create an account to become a guide</h2>
              <p className="text-gray-600 mt-2">Fill details below and we will help you complete a great profile.</p>

              <div className="mt-6">
                <GuideRegisterForm />
              </div>

              <div className="mt-6 text-xs text-gray-400">
                By creating an account you agree to our <a href="/terms" className="text-secondary hover:underline">Terms & Conditions</a> and <a href="/privacy" className="text-secondary hover:underline">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GuideRegisterPage;
