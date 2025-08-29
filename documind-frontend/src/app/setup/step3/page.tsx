"use client";
import { useRouter } from "next/navigation";

export default function Step3() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      {/* Step Progress */}
      <div className="w-full max-w-md text-center">
        <p className="text-gray-400 text-sm mb-6 text-left">Step 3 of 3</p>

        {/* Top Icon */}
        <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-2xl mb-6">
          🎉
        </div>

        {/* Success Message */}
        <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-700 text-sm mb-6">
          You're all set! 🎊 Your business profile has been created and your
          recommended documents are ready.
        </div>

        {/* Check Illustration */}
        <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white text-3xl mb-6">
          ✔
        </div>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm sm:text-base">
          You can now explore your dashboard to track, manage, and customize all
          your compliance needs.
        </p>
      </div>

      {/* Go to Home */}
      <div className="w-full max-w-md">
        <button
          onClick={() => router.push("/home")}
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm sm:text-base font-medium shadow-md hover:bg-blue-700 transition"
        >
          Go to Home →
        </button>
      </div>
    </div>
  );
}
