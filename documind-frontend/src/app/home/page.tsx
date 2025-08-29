"use client";

import { useRouter } from "next/navigation";
import {
  Bell,
  Upload,
  BookOpen,
  ClipboardCheck,
  Users,
  FileText,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const quickActions = [
    {
      icon: <Upload className="w-6 h-6 text-white" />,
      label: "Upload",
      color: "bg-blue-600",
      path: "/upload",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-white" />,
      label: "Research",
      color: "bg-green-600",
      path: "/research",
    },
    {
      icon: <ClipboardCheck className="w-6 h-6 text-white" />,
      label: "Compliance",
      color: "bg-purple-600",
      path: "/compliance",
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      label: "Client",
      color: "bg-orange-600",
      path: "/client",
    },
    {
      icon: <FileText className="w-6 h-6 text-white" />,
      label: "Form",
      color: "bg-pink-600",
      path: "/form",
    },
  ];

  const alerts = [
    {
      color: "bg-red-500",
      title: "Compliance Report Due",
      desc: "Annual review for Smith & Co.",
      time: "Tomorrow, 10:00 AM",
    },
    {
      color: "bg-yellow-500",
      title: "Contract Review Required",
      desc: "New partnership agreement for Johnson Inc.",
      time: "Jun 22, 5:00 PM",
    },
    {
      color: "bg-green-500",
      title: "Court Filing Deadline",
      desc: "Parker vs. Allen case documents",
      time: "Jun 25, 3:00 PM",
    },
  ];

  const activities = [
    { icon: "📄", text: "Contract uploaded by Mike Ross", time: "10 minutes ago" },
    { icon: "📄", text: "Form #28B submitted to client", time: "2 hours ago" },
    { icon: "📅", text: "Meeting scheduled with Jane Doe", time: "Yesterday" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-4 py-3 border-b">
        <h1 className="text-xl font-bold">
          <span className="text-gray-800">DocuMind</span>
          <span className="text-blue-600">AI+</span>
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition" />
            <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs bg-blue-600 text-white rounded-full">
              3
            </span>
          </div>
          {/* Profile */}
          <div
            onClick={() => router.push("/profile")}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer transition transform hover:scale-105 active:scale-95 shadow-md"
          >
            R
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Welcome + Dashboard */}
        <div>
          <h2 className="text-lg font-semibold">Welcome back, Ritik!</h2>
          <p className="text-gray-500 text-sm">Tuesday, August 13</p>
        </div>

        <div className="bg-gray-900 text-white rounded-xl p-4">
          <p className="text-sm">Business Dashboard</p>
          <p className="text-xs text-gray-300 mb-2">Enterprise Account</p>
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg">
            Business
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold">14</div>
            <p className="text-xs text-gray-500">Active Documents</p>
          </div>
          <div>
            <div className="text-xl font-bold">3</div>
            <p className="text-xs text-gray-500">Pending Reviews</p>
          </div>
          <div>
            <div className="text-xl font-bold">86%</div>
            <p className="text-xs text-gray-500">Compliance Score</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-5">
            {quickActions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => router.push(item.path)}
                className="flex flex-col items-center gap-2 focus:outline-none cursor-pointer transition transform hover:scale-105 active:scale-95"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full shadow-md ${item.color}`}
                >
                  {item.icon}
                </div>
                <p className="text-xs">{item.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Priority Alerts */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Priority Alerts</h3>
            <button className="text-sm text-blue-600 hover:underline">Filter</button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start p-3 border rounded-xl"
              >
                <div className="flex gap-3">
                  <span
                    className={`w-3 h-3 mt-1 rounded-full ${alert.color}`}
                  ></span>
                  <div>
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.desc}</p>
                    <p className="text-xs text-gray-400">{alert.time}</p>
                  </div>
                </div>
                <button className="text-blue-600 text-sm cursor-pointer hover:underline">
                  Action
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-blue-600 text-sm mt-2 cursor-pointer hover:underline">
            View All Alerts
          </p>
        </div>

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Complete forms faster</p>
              <p className="text-xs text-blue-100">
                Our AI can help you fill standard legal forms
              </p>
            </div>
            <button
              onClick={() => router.push("/formfilling")}
              className="bg-white text-blue-600 px-3 py-1 text-xs rounded-lg transition transform hover:scale-105 active:scale-95 shadow"
            >
              Start Now
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <div className="space-y-3">
            {activities.map((a, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{a.icon}</span>
                  <div>
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-gray-400">{a.time}</p>
                  </div>
                </div>
                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
