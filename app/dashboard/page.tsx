"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserSession } from "@/types/user";
import { History as HistoryIcon, Bookmark, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function DashboardOverviewPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [historyCount, setHistoryCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setUser(data.data);
        } else {
          window.location.href = "/login";
        }
      });

    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setHistoryCount(data.data.length);
      });

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSavedCount(data.data.length);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-sm text-gray-500">Loading your developer dashboard...</div>;
  }

  return (
    <div className="space-y-8 py-4">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan: {user?.plan.toUpperCase()}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email} • Account status: Active
          </p>
        </div>

        <Link
          href="/pricing"
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md transition-all whitespace-nowrap"
        >
          {user?.plan === "free" ? "Upgrade to Pro" : "Manage Plan"}
        </Link>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">Executed Actions</span>
            <HistoryIcon className="w-4 h-4 text-brand-500" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{historyCount}</p>
          <Link href="/dashboard/history" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">
            View history log →
          </Link>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">Saved Results</span>
            <Bookmark className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{savedCount}</p>
          <Link href="/dashboard/saved" className="text-xs text-brand-600 dark:text-brand-400 hover:underline">
            View saved projects →
          </Link>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-semibold uppercase tracking-wider font-mono">Privacy Level</span>
            <ShieldCheck className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-500">100%</p>
          <p className="text-xs text-gray-500">Client-Side Memory Only</p>
        </div>
      </div>
    </div>
  );
}
