import React from 'react';

// Server Components must be functions. 
// They cannot be Classes and cannot have state.
const PrivacyPage = () => {
  
  // Define your data as simple variables (since state is not allowed)
  const data = {
    updatedDate: 'December 20, 2025',
    contactEmail: 'support@nativeways.com',
    companyName: 'NativeWays'
  };

  return (
    <main className="min-h-screen pt-16 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="main-container bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-white px-3 md:px-8 py-10 border-b border-gray-100 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-gray-500 font-medium uppercase tracking-wide">
            Last Updated: {data.updatedDate}
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-8 text-gray-600 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>{data.companyName}</strong>. We respect your privacy and are committed to protecting your personal data. This policy informs you how we handle your data when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Data We Collect
            </h2>
            <p className="mb-2">We collect the following personal data:</p>
            <ul className="list-disc pl-5 space-y-1 bg-gray-50 p-4 rounded-md">
              <li><strong>Identity Data:</strong> Name, username.</li>
              <li><strong>Contact Data:</strong> Email, phone number.</li>
              <li><strong>Technical Data:</strong> IP address, browser type.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Data Usage
            </h2>
            <p>
              We use your data to register you as a customer, process orders, and manage our relationship with you. We do not sell your personal data.
            </p>
          </section>

          {/* Contact Box */}
          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-lg font-bold text-blue-900 mb-2">
              Have Questions?
            </h2>
            <p className="text-primary mb-4">
              Contact our support team directly.
            </p>
            <a 
              href={`mailto:${data.contactEmail}`} 
              className="inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-700"
            >
              Email: {data.contactEmail}
            </a>
          </section>

        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {data.companyName}. All rights reserved.
          </p>
        </div>

      </div>
    </main>
  );
};

export default PrivacyPage;