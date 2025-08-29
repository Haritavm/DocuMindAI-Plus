"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Briefcase, Scale, Laptop } from "lucide-react";

export default function RoleSelection() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const roles = [
    {
      id: "business",
      title: "Business / Startup",
      description: "Get tailored compliance tools for your business",
      icon: <Briefcase className="w-5 h-5 text-white" />,
      color: "bg-blue-600",
    },
    {
      id: "law",
      title: "Law Firm",
      description: "Access case management and legal automation features",
      icon: <Scale className="w-5 h-5 text-white" />,
      color: "bg-yellow-500",
    },
    {
      id: "freelancer",
      title: "Freelancer / Consultant",
      description: "Streamlined contracts and document tools",
      icon: <Laptop className="w-5 h-5 text-white" />,
      color: "bg-green-500",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Select Your Role
        </h1>
        <p className="text-gray-600 mb-6">
          We'll personalize your dashboard based on your selection
        </p>

        {/* Role Options */}
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelected(role.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer border-2 transition rounded-xl ${
                selected === role.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-full ${role.color}`}
              >
                {role.icon}
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">{role.title}</h2>
                <p className="text-gray-500 text-sm">{role.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <Button
          className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={!selected}
          onClick={() => router.push("/setup/step1")}
        >
          Continue
        </Button>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>{" "}
          •{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </main>
  );
}
