"use client";

import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const CreativeFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      id: "01",
      question: "How are guides verified?",
      answer: "We believe in trust. Every guide undergoes a 3-step verification process: ID check, video interview, and a test tour to ensure safety and quality."
    },
    {
      id: "02",
      question: "What is the cancellation policy?",
      answer: "Life is unpredictable. You can cancel any experience up to 24 hours before the start time for a full, no-questions-asked refund."
    },
    {
      id: "03",
      question: "Do you offer private tours?",
      answer: "Yes! 90% of our experiences are private. You can book a guide exclusively for your family or group of friends for a more intimate experience."
    },
    {
      id: "04",
      question: "Is insurance included?",
      answer: "Basic liability insurance is included in every booking. However, we always recommend travelers carry their own comprehensive travel insurance."
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50">
      
      {/* --- BACKGROUND SHAPES (Abstract Blobs) --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative main-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* --- LEFT COLUMN: Sticky Title --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              Support & Help
            </span>
            <h2 className="font-oswald text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Got <br/>
              <span className="relative z-10">
                Questions?
                {/* Underline Shape */}
                <svg className="absolute bottom-1 left-0 w-full h-3 -z-10 text-emerald-200" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We know you might have a few questions before your journey. Here are the answers to the most common ones.
            </p>
            
            <a href="/contact" className="inline-flex items-center gap-2 text-emerald-800 font-bold hover:gap-4 transition-all duration-300">
              Ask something else <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* --- RIGHT COLUMN: Unique Shape Accordion --- */}
          <div className="lg:col-span-7 space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  onClick={() => toggleFaq(index)}
                  className={`
                    cursor-pointer transition-all duration-500 ease-out
                    border border-gray-100 shadow-sm
                    /* UNIQUE SHAPE: Rounded Top-Left and Bottom-Right only */
                    rounded-tl-[40px] rounded-br-[40px] rounded-tr-none rounded-bl-none
                    ${isOpen ? 'bg-emerald-800 text-white shadow-xl scale-[1.02]' : 'bg-white text-gray-800 hover:shadow-md'}
                  `}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`text-sm font-mono font-bold ${isOpen ? 'text-emerald-300' : 'text-emerald-600'}`}>
                          {faq.id}
                        </span>
                        <h3 className="text-xl font-bold">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown 
                        className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-180 text-emerald-300' : 'text-gray-400'}`} 
                      />
                    </div>
                    
                    <div 
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className={`leading-relaxed ${isOpen ? 'text-emerald-100' : 'text-gray-600'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CreativeFaq;