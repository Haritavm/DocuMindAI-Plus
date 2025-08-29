"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SelectVerifiedPage() {
    const router = useRouter();
    const [selected, setSelected] = useState<string | null>(null);

    const documents = [
        { id: "business", name: "Business Registration Form" },
        { id: "tax", name: "Tax Identification Form" },
        { id: "operating", name: "Operating Agreement" },
    ];

    const handleNext = () => {
        if (selected) {
            router.push(`/preview?doc=${selected}`);
        } else {
            alert("Please select a document before proceeding.");
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center bg-white px-4 py-10">
            <div className="w-full max-w-xl">
                <h1 className="text-center text-2xl font-semibold text-gray-900 mb-2">
                    Select Verified Document
                </h1>
                <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
                    Choose a verified document to proceed with form filling.
                </p>

                <div className="space-y-3">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            onClick={() => setSelected(doc.id)}
                            className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer transition shadow-sm ${selected === doc.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            <div>
                                <p className="font-medium text-gray-900">{doc.name}</p>
                                <p className="text-sm text-gray-500">
                                    All documents submitted and verified
                                </p>
                            </div>
                            <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition ${selected === doc.id
                                        ? "bg-blue-600 border-blue-600"
                                        : "border-gray-300"
                                    }`}
                            >
                                {selected === doc.id && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.704 5.29a1 1 0 00-1.408-1.42l-7.296 7.228-3.296-3.27a1 1 0 00-1.408 1.42l4 3.97a1 1 0 001.408 0l8-7.928z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="mt-10 w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium text-lg shadow-md hover:bg-blue-700 active:scale-95 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
