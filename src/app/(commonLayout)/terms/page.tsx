import React from 'react';

const TermsPage = () => {
  // Static data for the Server Component
  const data = {
    updatedDate: 'December 20, 2025',
    companyName: 'NativeWays',
    contactEmail: 'support@nativeways.com',
    websiteUrl: 'www.nativeways.com'
  };

  return (
    <main className="min-h-screen pt-16 bg-gray-50 py-12 px-4 sm:px-3 lg:px-8">
      <div className="main-container bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-white px-3 md:px-8 py-10 border-b border-gray-100 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-gray-500 font-medium uppercase tracking-wide">
            Last Updated: {data.updatedDate}
          </p>
        </div>

        {/* Content Body */}
        <div className="px-8 py-8 space-y-8 text-gray-600 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using <strong>{data.websiteUrl}</strong> (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              2. Use License
            </h2>
            <p className="mb-2">
              Permission is granted to temporarily download one copy of the materials (information or software) on {data.companyName}'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 space-y-1 bg-gray-50 p-4 rounded-md">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website;</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              3. Disclaimer
            </h2>
            <p>
              The materials on {data.companyName}'s website are provided on an 'as is' basis. {data.companyName} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              4. Limitations
            </h2>
            <p>
              In no event shall {data.companyName} or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on {data.companyName}'s website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              5. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the country in which {data.companyName} is established and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>

          {/* Contact / Action Area */}
          <section className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h2 className="text-lg font-bold text-green-900 mb-2">
              Questions regarding these Terms?
            </h2>
            <p className="text-green-800 mb-4">
              If you have any questions or require clarification regarding these Terms of Service, please contact us.
            </p>
            <a 
              href={`mailto:${data.contactEmail}`} 
              className="inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Contact Support
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

export default TermsPage;