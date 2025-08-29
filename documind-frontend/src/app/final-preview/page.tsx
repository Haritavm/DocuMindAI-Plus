"use client";

import { useRouter } from "next/navigation";
import { FileText, CheckCircle2, Download } from "lucide-react";

export default function DocumentPreviewPage() {
    const router = useRouter();

    const handleComplete = () => {
        alert("🎉 Document completed successfully!");
        router.push("/home"); // you can later redirect to dashboard or success page
    };

    const handleDownload = () => {
        alert("⬇️ PDF Download started");
        // You can integrate actual PDF download here
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10">
            {/* Header */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Document Preview
            </h1>

            {/* Info Banner */}
            <div className="w-full max-w-md bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-gray-700">
                    Your document has been filled with the details you provided. Please review below.
                </p>
            </div>

            {/* Document Image Preview */}
            <div className="w-full max-w-md border rounded-xl overflow-hidden shadow-sm mb-6">
                <img
                    src="/sample-doc.png" // replace with dynamic preview or uploaded file
                    alt="Document Preview"
                    className="w-full"
                />
            </div>

            {/* Secure Info */}
            <p className="text-sm text-gray-600 mb-6 text-center">
                This document is digitally verified and secure.
            </p>

            {/* Buttons */}
            <div className="w-full max-w-md flex flex-col gap-3">
                <button
                    onClick={handleComplete}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium flex justify-center items-center gap-2 hover:bg-blue-700 active:scale-95 transition"
                >
                    <CheckCircle2 className="h-5 w-5" />
                    Complete
                </button>

                <button
                    onClick={handleDownload}
                    className="w-full border border-gray-300 text-gray-800 py-3 rounded-xl font-medium flex justify-center items-center gap-2 hover:bg-gray-100 active:scale-95 transition"
                >
                    <Download className="h-5 w-5" />
                    Download PDF
                </button>
            </div>

            {/* Footer */}
            <p className="mt-8 text-xs text-gray-500 text-center">
                All data is secure and verified.
            </p>
        </div>
    );
}
