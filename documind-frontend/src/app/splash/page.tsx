"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Splash() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-indigo-600 text-white px-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">DocuMind AI+</h1>
        <p className="text-lg md:text-xl text-indigo-100 mb-8">
          AI-powered legal & business documentation made simple.
        </p>
        <Button
          size="lg"
          className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl cursor-pointer"
          onClick={() => router.push("/onboarding")}
        >
          Get Started
        </Button>
      </div>
    </main>
  );
}

