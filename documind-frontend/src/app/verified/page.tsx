"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Verified() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
            <CheckCircle className="w-24 h-24 text-green-500" />
            <h1 className="mt-6 text-2xl font-bold text-gray-900">
                Document Verified Successfully!
            </h1>
            <p className="mt-2 text-gray-600">
                Your document has been reviewed and looks perfect. You're all set to continue.
            </p>

            <Button
                onClick={() => router.push("/formfilling")}
                className="mt-8 w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-full"
            >
                Proceed to Form Fill
            </Button>

            <p className="mt-2 text-gray-400">Next step: Fill out your form quickly and easily.</p>
        </div>
    );
}
// "use client";
// import { useRouter } from "next/navigation";

// export default function Verified() {
//     const router = useRouter();
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen text-center">
//             <h1 className="text-2xl font-bold text-green-600">✅ Document Verified</h1>
//             <button
//                 onClick={() => router.push("/dashboard")}
//                 className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
//             >
//                 Go to Dashboard →
//             </button>
//         </div>
//     );
// }
