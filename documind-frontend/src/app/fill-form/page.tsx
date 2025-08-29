"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";

export default function FillFormPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "Acme Corporation",
        businessId: "123-456-789",
        address: "123 MG Road, Andheri East, Mumbai",
        incorporationDate: "22/08/2025",
        agent: "Ritik Ray",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // const handleSubmit = () => {
    //     localStorage.setItem("formData", JSON.stringify(form));
    //     router.push("/success"); // redirect without alert
    // };


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10">
            {/* Title */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                Fill Form
            </h1>

            {/* Info Banner */}
            <div className="w-full max-w-md bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-gray-700">
                    We’ve pre-filled this form based on your document. Please review and make changes if needed.
                </p>
            </div>

            {/* Form */}
            <form className="w-full max-w-md flex flex-col gap-4">
                {/* Name */}
                <div>
                    <label className="block text-gray-700 text-sm mb-1">Name</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="flex-1 border rounded-l-lg px-3 py-2 text-gray-800"
                        />
                        <span className="px-3 py-2 bg-gray-100 text-xs text-gray-500 rounded-r-lg border-l">
                            AI-filled
                        </span>
                    </div>
                </div>

                {/* Business ID */}
                <div>
                    <label className="block text-gray-700 text-sm mb-1">Business ID</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="businessId"
                            value={form.businessId}
                            onChange={handleChange}
                            className="flex-1 border rounded-l-lg px-3 py-2 text-gray-800"
                        />
                        <span className="px-3 py-2 bg-gray-100 text-xs text-gray-500 rounded-r-lg border-l">
                            AI-filled
                        </span>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-gray-700 text-sm mb-1">Address</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="flex-1 border rounded-l-lg px-3 py-2 text-gray-800"
                        />
                        <span className="px-3 py-2 bg-gray-100 text-xs text-gray-500 rounded-r-lg border-l">
                            AI-filled
                        </span>
                    </div>
                </div>

                {/* Date of Incorporation */}
                <div>
                    <label className="block text-gray-700 text-sm mb-1">Date of Incorporation</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="incorporationDate"
                            value={form.incorporationDate}
                            onChange={handleChange}
                            className="flex-1 border rounded-l-lg px-3 py-2 text-gray-800"
                        />
                        <span className="px-3 py-2 bg-gray-100 text-xs text-gray-500 rounded-r-lg border-l">
                            AI-filled
                        </span>
                    </div>
                </div>

                {/* Registered Agent */}
                <div>
                    <label className="block text-gray-700 text-sm mb-1">Registered Agent</label>
                    <div className="flex">
                        <input
                            type="text"
                            name="agent"
                            value={form.agent}
                            onChange={handleChange}
                            className="flex-1 border rounded-l-lg px-3 py-2 text-gray-800"
                        />
                        <span className="px-3 py-2 bg-gray-100 text-xs text-gray-500 rounded-r-lg border-l">
                            AI-filled
                        </span>
                    </div>
                </div>

                {/* Buttons */}
                <button
                    type="button"
                    onClick={(handleSubmit => router.push("/final-preview"))}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 active:scale-95 transition"
                >
                    Submit Form
                </button>
                <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 active:scale-95 transition"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}
