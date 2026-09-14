"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALL_TOOLS } from "@/lib/tools/registry";
import { Shield, Users, DollarSign, FileCode, CheckCircle2, AlertCircle } from "lucide-react";

interface AdminStats {
  totalTools: number;
  totalUsers: number;
  proUsers: number;
  totalProjects: number;
  totalExecutions: number;
  mrr: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<Array<{ _id: string; name: string; email: string; role: string; plan: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      });

    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-amber-500" />
            <span>Admin Management Center</span>
          </h1>
          <p className="text-xs text-gray-500">Platform overview, user accounts, and SEO content status.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <span className="text-xs font-semibold uppercase text-gray-400 font-mono">Monthly Revenue</span>
          <p className="text-3xl font-extrabold text-emerald-500">${stats?.mrr.toFixed(2) || "0.00"}</p>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <span className="text-xs font-semibold uppercase text-gray-400 font-mono">Total Users</span>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{stats?.totalUsers || 0}</p>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <span className="text-xs font-semibold uppercase text-gray-400 font-mono">Pro Subscribers</span>
          <p className="text-3xl font-extrabold text-brand-500">{stats?.proUsers || 0}</p>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <span className="text-xs font-semibold uppercase text-gray-400 font-mono">Active Tools</span>
          <p className="text-3xl font-extrabold text-purple-500">{ALL_TOOLS.length}</p>
        </div>
      </div>

      {/* Registered Users Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Registered Users</h2>
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-950 text-gray-500 border-b border-gray-100 dark:border-gray-800 uppercase font-mono">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
              {users.length === 0 ? (
                <tr><td colSpan={4} className="p-4 text-center text-gray-400">No registered users yet.</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-4 font-semibold">{u.name}</td>
                    <td className="p-4 font-mono">{u.email}</td>
                    <td className="p-4 uppercase font-bold text-[10px] text-amber-500">{u.role}</td>
                    <td className="p-4 uppercase font-bold text-[10px] text-brand-500">{u.plan}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tool SEO Completeness Audit */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tool SEO Audit Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_TOOLS.map((t) => {
            const isComplete = t.seoTitle && t.seoDescription && t.faqs?.length > 0 && t.howTo?.length > 0;
            return (
              <div key={t.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{t.name}</h3>
                  <span className="text-[10px] text-gray-400 font-mono">/tools/{t.slug}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  {isComplete ? (
                    <span className="flex items-center gap-1 text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" /> SEO Ready
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                      <AlertCircle className="w-3.5 h-3.5" /> Incomplete
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
