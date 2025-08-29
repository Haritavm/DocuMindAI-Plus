"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SetupPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // get role from URL
  const role = searchParams.get("role") || "Business Startup";

  // track current step
  const [step, setStep] = useState(1);

  // go next
  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      router.push("/home"); // redirect to home after final step
    }
  };

  // go back
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        {/* Role Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-600 mb-6">
          {role} Setup
        </h1>

        {/* Step Progress */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 mx-1 rounded-full ${
                step >= s ? "bg-indigo-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Step Content */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 1 – Business Introduction</h2>
            <p className="text-gray-600 mb-6">
              Provide basic details about your {role} to get started.
            </p>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 2 – Recommended Documents</h2>
            <p className="text-gray-600 mb-6">
              We’ll suggest important documents your {role} needs.
            </p>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 3 – Setup Complete</h2>
            <p className="text-gray-600 mb-6">
              You’re all set! Click finish to go to your dashboard.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            disabled={step === 1}
            variant="outline"
          >
            Back
          </Button>
          <Button onClick={nextStep}>
            {step === 3 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </main>
  );
}
