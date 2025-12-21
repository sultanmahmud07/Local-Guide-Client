import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/pages/Contact/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
      title: "Contact Us | NativeWays Support & Inquiries",
      description: "Have questions or need assistance? Get in touch with the NativeWays support team. We are here to help travelers and guides 24/7 with bookings, safety, and general inquiries.",
      keywords: [
            "customer support",
            "contact NativeWays",
            "travel help",
            "nativeways phone number",
            "nativeways email",
            "help center"
      ],
}
const ContactPage = () => {
      return (
            <div className="bg-gray-50 min-h-screen pt-16">

                  {/* --- 1. HERO SECTION --- */}
                  <section className="bg-emerald-900 py-20 px-4 text-center text-white relative overflow-hidden">
                        {/* Decorative pattern overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px]"></div>

                        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                              <span className="inline-block py-1 px-3 rounded-full bg-emerald-800 text-emerald-100 text-xs font-bold uppercase tracking-wider border border-emerald-700">
                                    Support 24/7
                              </span>
                              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                    Get in Touch
                              </h1>
                              <p className="text-emerald-100 text-lg">
                                    Have a question about a tour? Want to become a guide? We&apos;re here to help you navigate your journey.
                              </p>
                        </div>
                  </section>

                  {/* --- 2. MAIN CONTENT --- */}
                  <section className="main-container px-4 py-16 -mt-10 relative z-20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                              {/* LEFT COLUMN: Contact Info */}
                              <div className="lg:col-span-1 space-y-6">

                                    {/* Contact Card */}
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-8">
                                          <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

                                                <div className="space-y-6">
                                                      <div className="flex items-start gap-4 group">
                                                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                                  <Mail className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                  <p className="text-sm font-medium text-gray-500">Email us</p>
                                                                  <a href="mailto:support@nativeways.com" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors">
                                                                        support@nativeways.com
                                                                  </a>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-start gap-4 group">
                                                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                                  <Phone className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                  <p className="text-sm font-medium text-gray-500">Call us</p>
                                                                  <a href="tel:+880123456789" className="text-gray-900 font-semibold hover:text-emerald-600 transition-colors">
                                                                        +880 1234 567 890
                                                                  </a>
                                                            </div>
                                                      </div>

                                                      <div className="flex items-start gap-4 group">
                                                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                                  <MapPin className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                  <p className="text-sm font-medium text-gray-500">Visit us</p>
                                                                  <p className="text-gray-900 font-semibold">
                                                                        Level 4, Gulshan Avenue<br />Dhaka 1212, Bangladesh
                                                                  </p>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="pt-8 border-t border-gray-100">
                                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                      <Clock className="w-4 h-4 text-emerald-600" /> Office Hours
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                      Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                                                      Friday - Saturday: Closed
                                                </p>
                                          </div>
                                    </div>

                                    {/* Social / FAQ CTA */}
                                    <div className="bg-emerald-600 rounded-2xl shadow-lg p-8 text-white text-center space-y-4">
                                          <MessageSquare className="w-10 h-10 mx-auto opacity-80" />
                                          <h3 className="font-bold text-xl">Quick Answers?</h3>
                                          <p className="text-emerald-100 text-sm">
                                                Check out our Frequently Asked Questions to find answers instantly.
                                          </p>
                                          <Button variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-emerald-700">
                                                Visit FAQ Center
                                          </Button>
                                    </div>

                              </div>

                              {/* RIGHT COLUMN: Form & Map */}
                              <div className="lg:col-span-2 space-y-8">

                                    {/* Contact Form */}
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
                                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                                          <p className="text-gray-500 mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                                          <ContactForm />
                                    </div>

                                    {/* Map Embed */}
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-[300px] relative">
                                          <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0450630650943!2d90.41375367605658!3d23.781403087588325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a0f70deb73%3A0x30c36498f9c26888!2sGulshan%201%2C%20Dhaka%201212!5e0!3m2!1sen!2sbd!4v1703080000000!5m2!1sen!2sbd"
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="grayscale hover:grayscale-0 transition-all duration-500"
                                          ></iframe>
                                          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md text-xs font-bold text-gray-700">
                                                📍 Dhaka HQ
                                          </div>
                                    </div>

                              </div>
                        </div>
                  </section>

            </div>
      );
};

export default ContactPage;