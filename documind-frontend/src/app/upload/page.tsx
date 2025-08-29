// "use client";

// import { useRouter } from "next/navigation";
// import { Camera, Image as ImageIcon } from "lucide-react";

// export default function UploadPage() {
//   const router = useRouter();

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10">
//       {/* Title */}
//       <h1 className="text-2xl font-semibold text-gray-800 mb-4">
//         Upload Your Document
//       </h1>

//       <div className="w-full h-px bg-gray-200 mb-6" />

//       {/* Upload Box */}
//       <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-sm flex flex-col items-center justify-center py-12 mb-6">
//         <div className="bg-blue-100 p-6 rounded-xl mb-4">
//           <Camera className="h-10 w-10 text-blue-600" />
//         </div>
//         <p className="text-gray-600 text-center text-sm px-4">
//           Select a method to upload your legal document
//         </p>
//       </div>

//       {/* Buttons */}
//       <div className="w-full max-w-md flex flex-col gap-4">
//         <button
//           type="button"
//           onClick={() => router.push("/scanning")}
//           className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-full font-medium active:scale-95 transition"
//         >
//           <Camera className="h-5 w-5" />
//           Use Camera
//         </button>

//         <button
//           type="button"
//           onClick={() => router.push("/scanning")}
//           className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-4 rounded-full font-medium active:scale-95 transition"
//         >
//           <ImageIcon className="h-5 w-5" />
//           Upload from Gallery/Files
//         </button>
//       </div>

//       {/* Supported formats */}
//       <div className="w-full max-w-md mt-8 flex items-center justify-center">
//         <p className="text-gray-500 text-sm flex items-center gap-2">
//           <span className="material-icons text-base">description</span>
//           Supported formats: JPG, PNG, PDF
//         </p>
//       </div>
//     </div>
//   );
// }
//
"use client";

import { useRouter } from "next/navigation";
import { Camera, Image as ImageIcon } from "lucide-react";
import { runAgent } from "@/lib/qraptor";

export default function UploadPage() {
  const router = useRouter();

  const handleFileUpload = async (file: File) => {
    try {
      // Call the Qraptor Document Upload Agent
      const formData = new FormData();
      formData.append("file", file);

      const response = await runAgent({
        agentName: "DocumentUploade", // match your env endpoint
        userVariables: { fileName: file.name },
        file: file, // pass the actual file if your agent supports multipart/form-data
      });

      console.log("Upload agent response:", response);

      // Store uploaded file info for scanning page
      sessionStorage.setItem("uploadedFileName", file.name);
      router.push("/scanning");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleCameraClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,application/pdf";
    input.capture = "environment";
    input.onchange = () => {
      if (input.files && input.files[0]) {
        handleFileUpload(input.files[0]);
      }
    };
    input.click();
  };

  const handleGalleryClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,application/pdf";
    input.onchange = () => {
      if (input.files && input.files[0]) {
        handleFileUpload(input.files[0]);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Upload Your Document
      </h1>

      <div className="w-full h-px bg-gray-200 mb-6" />

      <div className="w-full max-w-md bg-gray-50 rounded-2xl shadow-sm flex flex-col items-center justify-center py-12 mb-6">
        <div className="bg-blue-100 p-6 rounded-xl mb-4">
          <Camera className="h-10 w-10 text-blue-600" />
        </div>
        <p className="text-gray-600 text-center text-sm px-4">
          Select a method to upload your legal document
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <button
          type="button"
          onClick={handleCameraClick}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-full font-medium active:scale-95 transition"
        >
          <Camera className="h-5 w-5" />
          Use Camera
        </button>

        <button
          type="button"
          onClick={handleGalleryClick}
          className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-4 rounded-full font-medium active:scale-95 transition"
        >
          <ImageIcon className="h-5 w-5" />
          Upload from Gallery/Files
        </button>
      </div>

      <div className="w-full max-w-md mt-8 flex items-center justify-center">
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <span className="material-icons text-base">description</span>
          Supported formats: JPG, PNG, PDF
        </p>
      </div>
    </div>
  );
}
