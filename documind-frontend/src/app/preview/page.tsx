"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function FormPreviewPage() {
    const params = useSearchParams();
    const router = useRouter();

    const doc = params.get("doc");

    const docsMap: Record<string, { title: string; preview: string }> = {
        business: {
            title: "Business Registration Form",
            preview: "/forms/business.png", // replace with actual file path
        },
        tax: {
            title: "Tax Identification Form",
            preview: "/forms/tax.png",
        },
        operating: {
            title: "Operating Agreement",
            preview: "/forms/operating.png",
        },
    };

    const selectedDoc = doc ? docsMap[doc] : null;

    if (!selectedDoc) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Invalid Document Selected
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center bg-white px-4 py-8">
            <div className="w-full max-w-2xl">
                <h1 className="text-center text-xl font-semibold text-gray-900 mb-6">
                    Form Preview
                </h1>

                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {selectedDoc.title}
                </h2>
                <p className="text-gray-600 mb-6">
                    AI has extracted this form from your verified document.
                </p>

                {/* Preview Image */}
                <div className="w-full border rounded-xl shadow-sm overflow-hidden mb-6">
                    <img
                        src={selectedDoc.preview}
                        alt="Form Preview"
                        className="w-full object-contain"
                    />
                </div>

                {/* Info Note */}
                <div className="flex items-start gap-2 text-gray-600 mb-8 text-sm">
                    <span className="text-lg">❓</span>
                    <p>
                        We’ve generated this form from your document. Would you like to fill
                        it? If yes, please provide some details.
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={() => router.push("/fill-form/")}
                    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-medium text-lg shadow-md hover:bg-blue-700 active:scale-95 transition"
                >
                    Proceed to Fill Form
                </button>
            </div>
        </div>
    );
}
