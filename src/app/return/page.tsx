// app/returns/page.tsx
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const CANONICAL_ORIGIN =
  process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || "https://theschoolofoptions.com";

export const metadata: Metadata = {
  title: "Return & Refund Policy - The School of Options",
  description:
    "Our clear policy for course returns and refunds, including eligibility criteria and the refund process for digital educational services.",
  metadataBase: new URL(CANONICAL_ORIGIN),
  alternates: {
    canonical: "/returns",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-8">
          Return & Refund Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> October 1, 2025
          </p>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8 text-black">
            <p className="text-orange-800 font-semibold mb-2 text-black">
              ⚠️ Important Notice on Digital Content
            </p>
            <p className=" text-black">
              The School of Options provides non-tangible, digital educational
              services. Due to the immediate access granted to proprietary
              content upon purchase, our refund policy is strict. We offer a
              **2-day (48-hour) refund window** only for eligible courses, as
              detailed below.
            </p>
          </div>

          {/* 1. Scope */}
          <section id="scope" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              1. Scope of Policy
            </h2>
            <p className="text-gray-700">
              This Return & Refund Policy applies to the purchase of all online
              courses, digital content, and mentorship programs ("Services")
              offered directly by The School of Options on{" "}
              <a
                href="https://theschoolofoptions.com"
                target="_blank"
                rel="noreferrer"
              >
                theschoolofoptions.com
              </a>
              .
            </p>
          </section>

          {/* 2. Refund Eligibility Window */}
          <section id="eligibility-window" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              2. Refund Eligibility Window (2 Days)
            </h2>
            <p className="text-gray-700">
              A full refund may be requested only within **two (2) calendar days
              (48 hours)** from the moment of purchase, subject to the conditions
              below. After 48 hours, all sales are final, and no refunds will be
              issued.
            </p>
          </section>

          {/* 3. Conditions for Refund */}
          <section id="conditions" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              3. Refund Conditions & Exclusions
            </h2>
            <h3 className="text-xl font-semibold text-navy mt-4 mb-2">
              A. General Conditions:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>
                The refund request must be submitted via email to{" "}
                <a href="mailto:hello@theschoolofoptions.com">
                  hello@theschoolofoptions.com
                </a>{" "}
                within the 48-hour window.
              </li>
              <li>
                The user's engagement/consumption of the course content **must
                not exceed 10%** of the total course material (measured by video
                completion or downloaded content access).
              </li>
              <li>
                Access to any premium or exclusive community (e.g., Telegram,
                Discord groups) must be immediately terminated upon refund
                request.
              </li>
            </ul>
            <h3 className="text-xl font-semibold text-navy mt-4 mb-2">
              B. Non-Refundable Items & Services:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>
                Courses or services where consumption **exceeds 10%** of the
                content.
              </li>
              <li>
                **Live Mentorship Programs, Workshops, or 1-on-1 Sessions** that
                have already commenced or been scheduled.
              </li>
              <li>
                Any product offered as a **"Bundle"** where a significant portion
                of the content has been accessed.
              </li>
              <li>
                Courses purchased during a **special promotion or sale** where
                the terms explicitly state "No Refunds."
              </li>
            </ul>
          </section>

          {/* 4. How to Request a Refund */}
          <section id="request-process" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              4. How to Request a Refund
            </h2>
            <p className="text-gray-700 mb-3">
              To request a refund, please follow these steps:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-black">
              <li>
                Send an email to{" "}
                <a href="mailto:hello@theschoolofoptions.com">
                  hello@theschoolofoptions.com
                </a>{" "}
                within 48 hours of purchase.
              </li>
              <li>
                The subject line must read: **REFUND REQUEST - [Your Course
                Name]**.
              </li>
              <li>
                Include your **Full Name, Email Address**, and **Order/Transaction
                ID** in the body of the email.
              </li>
              <li>
                Briefly state the **reason** for your refund request.
              </li>
            </ol>
          </section>

          {/* 5. Processing and Timeline */}
          <section id="processing" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              5. Refund Processing and Timeline
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-black">
              <li>
                Upon receiving your request, we will review your course access
                and consumption data against the eligibility criteria (Section 3).
              </li>
              <li>
                If approved, your refund will be processed within **7 to 14
                business days**.
              </li>
              <li>
                The refund will be credited back to the **original payment
                method** used for the purchase. The time taken for the amount to
                reflect in your account depends on your bank or payment gateway.
              </li>
              <li>
                A service charge deduction may apply based on the initial payment
                gateway fees incurred, which are non-refundable to us.
              </li>
            </ul>
          </section>

          {/* 6. Contact Information */}
          <section id="contact" className="mb-10">
            <h2 className="text-2xl font-bold text-navy mb-4">
              6. Contact for Policy Questions
            </h2>
            <p className="text-gray-700">
              For any questions regarding this Return & Refund Policy, please
              contact us at:{" "}
              <a href="mailto:hello@theschoolofoptions.com">
                hello@theschoolofoptions.com
              </a>
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