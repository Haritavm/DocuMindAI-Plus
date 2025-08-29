// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { runAgent } from "@/lib/qraptor";

// export default function Step2() {
//   const router = useRouter();
//   const [documents, setDocuments] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [role, setRole] = useState("");
//   const [businessId, setBusinessId] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedRole = localStorage.getItem("role") || "";
//       const savedBusinessId = localStorage.getItem("businessIdea") || "";
//       // 👆 using "businessIdea" from Step 1 but treating it as business_id

//       setRole(savedRole);
//       setBusinessId(savedBusinessId);

//       if (!savedRole || !savedBusinessId) {
//         setError("Missing role or business info. Go back and select again.");
//         setLoading(false);
//         return;
//       }

//       const fetchDocuments = async () => {
//         try {
//           const response = await runAgent({
//             agentName: "DocumentRecommendAgent",   // ✅ fixed agent name
//             userVariables: {
//               business_id: savedBusinessId,        // ✅ correct variable name
//               role: savedRole
//             },
//           });

//           setDocuments(response.documents || []);
//         } catch (err: any) {
//           console.error(err);
//           setError("Failed to fetch document recommendations");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchDocuments();
//     }
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 sm:px-6 lg:px-8">
//       <div className="w-full max-w-md">
//         <p className="text-gray-400 text-sm mb-6">Step 2 of 3</p>

//         {/* AI Bubble */}
//         <div className="flex items-start gap-3 mb-6">
//           <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white">
//             <span className="text-lg">⚡</span>
//           </div>
//           <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-700 text-sm break-words whitespace-pre-wrap max-w-full overflow-auto max-h-64">
//             {loading
//               ? "Loading document recommendations..."
//               : error
//                 ? error
//                 : documents.length > 0
//                   ? `Based on your business info, here are some recommended documents:\n\n${documents
//                     .map((doc, idx) => `${idx + 1}. ${doc}`)
//                     .join("\n")}`
//                   : "No recommendations available."}
//           </div>
//         </div>

//         {/* Optional visual list */}
//         {!loading && !error && documents.length > 0 && (
//           <div className="space-y-3">
//             {documents.map((doc, idx) => (
//               <div
//                 key={idx}
//                 className="flex items-center gap-3 border rounded-xl px-4 py-3 text-gray-700 text-sm"
//               >
//                 <span className="text-blue-500">✔</span>
//                 {doc}
//               </div>
//             ))}
//           </div>
//         )}

//         <p className="text-gray-400 text-xs mt-4">
//           You can review or customize these suggestions later in your dashboard.
//         </p>
//       </div>

//       {/* Continue Button */}
//       <div className="w-full max-w-md">
//         <button
//           onClick={() => router.push("/setup/step3")}
//           className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm sm:text-base font-medium shadow-md hover:bg-blue-700 transition"
//         >
//           Continue →
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { runAgent } from "@/lib/qraptor";

export default function Step2() {
  const router = useRouter();
  const [documents, setDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [role, setRole] = useState("");
  const [businessId, setBusinessId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("role") || "";
      const savedBusinessId = localStorage.getItem("business_id") || ""; // ✅ fixed

      setRole(savedRole);
      setBusinessId(savedBusinessId);

      if (!savedRole || !savedBusinessId) {
        setError("Missing role or business info. Go back and select again.");
        setLoading(false);
        return;
      }

      const fetchDocuments = async () => {
        try {
          const response = await runAgent({
            agentName: "DocumentRecommendAgent",
            userVariables: {
              business_id: savedBusinessId,
              role: savedRole,
            },
          });

          setDocuments(response.documents || []);
        } catch (err: any) {
          console.error(err);
          setError("Failed to fetch document recommendations");
        } finally {
          setLoading(false);
        }
      };

      fetchDocuments();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <p className="text-gray-400 text-sm mb-6">Step 2 of 3</p>

        {/* AI Bubble */}
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white">
            ⚡
          </div>
          <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-700 text-sm break-words whitespace-pre-wrap max-w-full overflow-auto max-h-96">
            {loading
              ? "Loading document recommendations..."
              : error
                ? error
                : documents.length > 0
                  ? `Based on your business info, here are some recommended documents:\n\n${documents
                    .map((doc, idx) => `${idx + 1}. ${doc}`)
                    .join("\n")}`
                  : "No recommendations available."}
          </div>
        </div>

        {/* List */}
        {!loading && !error && documents.length > 0 && (
          <div className="space-y-3">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 border rounded-xl px-4 py-3 text-gray-700 text-sm"
              >
                <span className="text-blue-500">✔</span>
                {doc}
              </div>
            ))}
          </div>
        )}

        <p className="text-gray-400 text-xs mt-4">
          You can review or customize these suggestions later in your dashboard.
        </p>
      </div>

      {/* Continue */}
      <div className="w-full max-w-md">
        <button
          onClick={() => router.push("/setup/step3")}
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm sm:text-base font-medium shadow-md hover:bg-blue-700 transition"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
