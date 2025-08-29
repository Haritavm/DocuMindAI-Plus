"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle, Info } from "lucide-react";

export default function Failed() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
            <XCircle className="w-24 h-24 text-red-500" />
            <h1 className="mt-6 text-2xl font-bold text-red-700">
                Document Could Not Be Verified
            </h1>
            <p className="mt-2 text-gray-600">
                The document you uploaded is not valid or unreadable. Please try again with the correct file.
            </p>

            <div className="mt-6 space-y-3 w-full max-w-sm">
                <Button
                    onClick={() => router.push("/upload")}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg rounded-full"
                >
                    Re-upload Document
                </Button>

                <Button
                    onClick={() => router.push("/home")}
                    variant="outline"
                    className="w-full py-6 text-lg rounded-full"
                >
                    Cancel
                </Button>
            </div>

            <div className="mt-6 flex items-start gap-2 bg-red-50 p-4 rounded-lg w-full max-w-sm">
                <Info className="w-5 h-5 text-red-500 mt-1" />
                <p className="text-sm text-red-600">
                    Make sure your document is clear, not blurred, and all details are visible.
                </p>
            </div>
        </div>
    );
}
// "use client";
// import { useRouter } from "next/navigation";

// export default function Failed() {
//     const router = useRouter();
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen text-center">
//             <h1 className="text-2xl font-bold text-red-600">❌ Verification Failed</h1>
//             <button
//                 onClick={() => router.push("/upload")}
//                 className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700"
//             >
//                 Try Again →
//             </button>
//         </div>
//     );
// }

