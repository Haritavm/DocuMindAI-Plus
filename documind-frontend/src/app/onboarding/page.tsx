"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Onboarding() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="max-w-md w-full text-center">
        <img
          src="./images/onboarding1.png"
          alt="Onboarding"
          className="mx-auto mb-8 w-48 h-48"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Welcome to DocuMind AI+
        </h1>
        <p className="text-gray-600 mb-8 text-base md:text-lg">
          Smart legal and business documents generated instantly with AI.
          Get started in a few simple steps.
        </p>

        <Button
          size="lg"
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
          onClick={() => router.push("/login")}
        >
          Continue
        </Button>
      </div>
    </main>
  );
}
