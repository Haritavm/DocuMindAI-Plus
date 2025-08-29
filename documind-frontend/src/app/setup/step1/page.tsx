// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Send } from "lucide-react";

// export default function SetupStep1() {
//   const [businessId, setBusinessId] = useState("");  // ✅ renamed
//   const router = useRouter();

//   // Fetch role from localStorage (already selected in role page)
//   const role =
//     typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";

//   const handleNext = () => {
//     if (!businessId.trim())
//       return alert("Please enter your business ID / idea.");

//     // Save to localStorage for Step 2
//     localStorage.setItem("business_id", businessId);  // ✅ key changed
//     localStorage.setItem("role", role);

//     router.push("/setup/step2");
//   };

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-6">
//       <div className="w-full max-w-2xl">
//         <p className="text-sm text-gray-500 mb-4">Step 1 of 3</p>

//         {/* AI Bubble */}
//         <div className="flex items-start gap-3 mb-6">
//           <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl">
//             🤖
//           </div>
//           <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-sm md:max-w-lg">
//             <p className="text-gray-800 text-base md:text-lg">
//               Hi 👋 I'm your compliance assistant.
//               {role &&
//                 ` Since you selected the role "${role}", I can give more tailored suggestions.`}
//               Can you tell me a bit about your business? This will help me
//               suggest the right documents.
//             </p>
//           </div>
//         </div>

//         {/* Progress Dots */}
//         <div className="flex justify-start items-center gap-2 mb-6 ml-14">
//           <span className="h-2 w-2 rounded-full bg-blue-600"></span>
//           <span className="h-2 w-2 rounded-full bg-blue-300"></span>
//           <span className="h-2 w-2 rounded-full bg-blue-300"></span>
//         </div>

//         {/* Input */}
//         <div className="relative mb-2">
//           <Textarea
//             placeholder="Type about your business..."
//             value={businessId}
//             onChange={(e) => setBusinessId(e.target.value)}
//             className="pr-10 min-h-[140px] border-gray-300 text-base md:text-lg"
//           />
//           <button
//             type="button"
//             onClick={handleNext}
//             className="absolute bottom-3 right-3 text-blue-500 hover:text-blue-600"
//           >
//             <Send className="w-6 h-6" />
//           </button>
//         </div>
//         <p className="text-center text-gray-400 text-sm md:text-base mb-8">
//           The more details you provide, the better suggestions you’ll get.
//         </p>

//         <Button
//           onClick={handleNext}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 text-base md:text-lg font-medium"
//         >
//           Next →
//         </Button>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { runAgent } from "@/lib/qraptor";

export default function SetupStep1() {
  const [businessId, setBusinessId] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch role from localStorage (set in role page)
  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";

  const handleNext = async () => {
    if (!businessId.trim()) return alert("Please enter your business idea.");

    // Save to localStorage for Step 2
    localStorage.setItem("business_id", businessId);
    localStorage.setItem("role", role);

    setLoading(true);
    try {
      const response = await runAgent({
        agentName: "DocumentRecommendAgent",
        userVariables: {
          business_id: businessId,
          role,
        },
      });
      setAiReply(
        response?.message ||
        "Got it 👍 I'll suggest documents based on this in the next step."
      );
    } catch (err) {
      console.error(err);
      setAiReply("⚠️ Failed to connect to compliance agent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-6">
      <div className="w-full max-w-2xl">
        <p className="text-sm text-gray-500 mb-4">Step 1 of 3</p>

        {/* AI Intro */}
        <div className="flex items-start gap-3 mb-6">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl">
            🤖
          </div>
          <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-sm md:max-w-lg">
            <p className="text-gray-800 text-base md:text-lg">
              Hi 👋 I'm your compliance assistant.
              {role &&
                ` Since you selected the role "${role}", I can give more tailored suggestions.`}
              Can you tell me a bit about your business?
            </p>
          </div>
        </div>

        {/* Chat Box */}
        <div className="relative mb-4">
          <Textarea
            placeholder="Type about your business..."
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            className="pr-10 min-h-[140px] border-gray-300 text-base md:text-lg"
          />
          <button
            type="button"
            onClick={handleNext}
            className="absolute bottom-3 right-3 text-blue-500 hover:text-blue-600"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Thinking...</p>
        ) : (
          aiReply && (
            <div className="bg-blue-50 rounded-xl px-4 py-3 text-gray-700 text-sm whitespace-pre-wrap mb-6">
              {aiReply}
            </div>
          )
        )}

        <Button
          onClick={() => router.push("/setup/step2")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-6 text-base md:text-lg font-medium"
        >
          Next →
        </Button>
      </div>
    </main>
  );
}
