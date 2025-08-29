"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Mail, Phone, Briefcase } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center min-h-screen bg-white px-4 py-6">
            <h1 className="text-xl font-bold mb-6">Profile</h1>

            {/* Profile Card */}
            <div className="w-full max-w-md bg-gradient-to-b from-indigo-50 to-white shadow-md rounded-2xl p-6 flex flex-col items-center">
                <img
                    src="https://i.pravatar.cc/150?img=3"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
                <h2 className="text-xl font-bold mt-4">Ritik Ray</h2>
                <p className="text-green-600 font-medium">✔ Verified User</p>
            </div>

            {/* Info */}
            <div className="w-full max-w-md mt-6 space-y-4">
                <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span>dummy@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span>+91 88888 88888</span>
                </div>
                <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                    <span>#USR10293</span>
                </div>
            </div>

            {/* Documents */}
            <div className="w-full max-w-md mt-8">
                <h3 className="text-lg font-semibold mb-4">Your Documents</h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                        <span>Business Registration Form</span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                        <span>Address Proof</span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm">
                        <span>Tax Certificate</span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="w-full max-w-md mt-8 space-y-4">
                <Button className="w-full bg-blue-600 text-white rounded-xl py-3 text-lg shadow-md">
                    Update Profile
                </Button>
                <Button
                    variant="outline"
                    className="w-full rounded-xl py-3 text-lg shadow-md"
                >
                    Manage Documents
                </Button>
                <Button
                    onClick={() => router.push("/login")}
                    className="w-full bg-red-100 text-red-600 rounded-xl py-3 text-lg shadow-md"
                >
                    <LogOut className="mr-2" /> Logout
                </Button>
            </div>

            {/* Footer */}
            <p className="mt-6 text-xs text-gray-500 text-center max-w-xs">
                Your personal data is encrypted and secured by AI verification.
            </p>
        </div>
    );
}
