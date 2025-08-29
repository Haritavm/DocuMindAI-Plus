"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FormFillingIntro() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
                AI Form Filling
            </h1>

            {/* Subtitle */}
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
                Complete Forms Faster <br /> with AI
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-center text-sm mb-6">
                Select a verified document and let AI auto-fill the details for you.
            </p>

            {/* Robot Image */}
            <div className="w-full max-w-sm mb-8">
                <Image
                    src="/images/formfilling.png" // replace with your robot image path
                    alt="AI Robot"
                    width={400}
                    height={400}
                    className="rounded-xl mx-auto"
                />
            </div>

            {/* Start Now Button */}
            <button
                onClick={() => router.push("/formfilling/select")}
                className="bg-blue-600 text-white px-10 py-3 rounded-full text-base font-medium hover:bg-blue-700 active:scale-95 transition"
            >
                Start Now
            </button>
        </div>
    );
}
