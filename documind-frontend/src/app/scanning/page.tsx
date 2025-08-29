// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Progress } from "@/components/ui/progress";

// export default function ScanningPage() {
//   const router = useRouter();
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);

//           // Fake AI check: random success/failure
//           const success = Math.random() > 0.3; // 70% chance success
//           if (success) {
//             router.push("/verified");
//           } else {
//             router.push("/failed");
//           }

//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 500);

//     return () => clearInterval(interval);
//   }, [router]);

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10">
//       <h1 className="text-xl font-semibold text-gray-800 mb-4">
//         Scanning Document...
//       </h1>

//       {/* Progress Bar */}
//       <div className="w-full max-w-md mb-6">
//         <Progress value={progress} />
//       </div>

//       {/* Preview */}
//       <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-sm p-4 mb-6">
//         <Image
//           src="/document-preview.png"
//           alt="Document Preview"
//           width={400}
//           height={300}
//           className="rounded-lg"
//         />
//         <h2 className="font-medium text-gray-800 mt-4">Document Preview</h2>
//         <p className="text-sm text-gray-600">
//           Ensure the document is clear and readable before proceeding.
//         </p>
//       </div>

//       <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-600">
//         🤖 AI is verifying your document quality...
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { runAgent } from "@/lib/qraptor";

export default function ScanningPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          verifyDocument();
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const verifyDocument = async () => {
    try {
      const uploadedFileName = sessionStorage.getItem("uploadedFileName");
      if (!uploadedFileName) {
        alert("No uploaded file found. Please upload a document first.");
        router.push("/upload");
        return;
      }

      const response = await runAgent({
        agentName: "DocumentVerificationAgent",
        userVariables: { fileName: uploadedFileName },
      });

      console.log("Verification agent response:", response);

      // Assuming agent returns success boolean
      if (response.verified) {
        router.push("/verified");
      } else {
        router.push("/failed");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Document verification failed. Please try again.");
      router.push("/failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Scanning Document...
      </h1>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-6">
        <Progress value={progress} />
      </div>

      {/* Preview */}
      <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-sm p-4 mb-6">
        <img
          src="/document-preview.png"
          alt="Document Preview"
          width={400}
          height={300}
          className="rounded-lg"
        />
        <h2 className="font-medium text-gray-800 mt-4">Document Preview</h2>
        <p className="text-sm text-gray-600">
          Ensure the document is clear and readable before proceeding.
        </p>
      </div>

      <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-600">
        🤖 AI is verifying your document quality...
      </div>
    </div>
  );
}

