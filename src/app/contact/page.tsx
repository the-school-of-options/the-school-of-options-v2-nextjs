// app/contact/page.tsx
import {
    ArrowLeftIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
    UserIcon,
  } from "lucide-react";
  import { Metadata } from "next";
  import Link from "next/link";
  
  const CANONICAL_ORIGIN =
    process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || "https://theschoolofoptions.com";
  
  export const metadata: Metadata = {
    title: "Contact Us - The School of Options",
    description:
      "Get in touch with The School of Options team for support, general inquiries, or grievance redressal. All contact details for our India office.",
    metadataBase: new URL(CANONICAL_ORIGIN),
    alternates: {
      canonical: "/contact",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
  
  export default function ContactPage() {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">
            Contact The School of Options
          </h1>
  
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              We're here to help you on your options trading journey. Whether you
              have a question about our courses, need technical support, or have a
              specific grievance, please use the appropriate contact method below.
            </p>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* General Support */}
              <section
                id="general-support"
                className="p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center text-green-700 mb-3">
                  <MailIcon className="h-6 w-6 mr-3" />
                  <h2 className="text-xl font-bold">General Support & Sales</h2>
                </div>
                <p className="text-gray-700 mb-3">
                  For course inquiries, payment issues, or technical assistance.
                </p>
                <p className="text-black font-semibold">
                  Email:{" "}
                  <a href="mailto:hello@theschoolofoptions.com" className="text-navy hover:text-navy-light">
                    hello@theschoolofoptions.com
                  </a>
                </p>
              </section>
  
              {/* Grievance Officer */}
              <section
                id="grievance"
                className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm"
              >
                <div className="flex items-center text-red-700 mb-3">
                  <UserIcon className="h-6 w-6 mr-3" />
                  <h2 className="text-xl font-bold">Grievance Redressal</h2>
                </div>
                <p className="text-gray-700 mb-3">
                  Contact our designated Grievance Officer for data privacy concerns
                  or formal complaints (as per IT Rules, 2021).
                </p>
                <p className="text-black mb-1">
                  <strong>Officer:</strong> Kundan Kishore
                </p>
                <p className="text-black font-semibold">
                  Email:{" "}
                  <a href="mailto:kundan@theschoolofoptions.com" className="text-navy hover:text-navy-light">
                    kundan@theschoolofoptions.com
                  </a>
                </p>
              </section>
            </div>
            
            {/* --- */}
            <hr className="my-10 border-gray-200" />
            {/* --- */}
  
            {/* Corporate Details */}
            <section id="corporate-details" className="mb-10">
              <h2 className="text-2xl font-bold text-navy mb-4">
                Corporate & Postal Address
              </h2>
              <div className="flex items-start mb-4">
               <div className="flex items-start justify-start">
               <MapPinIcon className="h-6 w-6 text-navy mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700">
                  D 1/4, first floor, South City - 2, Gurugaon, Haryana, India - 122018
                </p>
               </div>
              </div>
              <div className="flex items-start justify-start w-full">
              <div className="flex items-start justify-start">
              <PhoneIcon className="h-6 w-6 text-navy mr-3 flex-shrink-0" />
                <p className="text-gray-700">
                   +91 9999007948
                </p>

              </div>
              </div>
            </section>
            
            {/* --- */}
            <hr className="my-10 border-gray-200" />
            {/* --- */}
  
            {/* Social Media CTA */}
            <section id="social" className="mb-10">
              <h2 className="text-2xl font-bold text-navy mb-4">
                Connect with Us
              </h2>
              <p className="text-gray-700">
                Follow us on social media for the latest updates, market analysis,
                and educational content. Links can be found in the footer of our website.
              </p>
            </section>
          </div>
  
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center bg-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-light transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }