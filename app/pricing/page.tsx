"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, Shield, HelpCircle } from "lucide-react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (plan: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPlan: plan }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        alert(data.data.message);
        window.location.href = "/dashboard";
      } else {
        alert(data.error?.message || "Please sign in to upgrade your subscription.");
        window.location.href = "/login";
      }
    } catch {
      setLoading(false);
      alert("Failed to process upgrade request.");
    }
  };

  return (
    <div className="space-y-12 py-4">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Simple, Transparent Pricing
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Start for free with core tools. Upgrade to Pro for ad-free productivity, cloud synchronization, and unlimited project saves.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* FREE PLAN */}
        <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Free</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Essential tools for individual developers</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$0</span>
              <span className="text-xs text-gray-500">/ forever</span>
            </div>
            <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-100 dark:border-gray-800">
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Access to 15+ core tools</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>100% Client-side processing</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Copy & file downloads</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-emerald-500" /><span>Standard execution limits</span></li>
            </ul>
          </div>
          <button
            onClick={() => window.location.href = "/register"}
            className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Get Started Free
          </button>
        </div>

        {/* PRO PLAN (RECOMMENDED) */}
        <div className="relative p-8 rounded-3xl border-2 border-brand-500 bg-white dark:bg-gray-900 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow">
            Most Popular
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <span>Pro</span>
              <Sparkles className="w-4 h-4 text-brand-500" />
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">For power developers & daily users</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$5.99</span>
              <span className="text-xs text-gray-500">/ month ($49/yr)</span>
            </div>
            <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-100 dark:border-gray-800">
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-brand-500" /><span>Everything in Free</span></li>
              <li className="flex items-center space-x-2 font-semibold text-brand-600 dark:text-brand-400"><Check className="w-4 h-4 text-brand-500" /><span>100% Ad-Free Experience</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-brand-500" /><span>Unlimited Saved Projects</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-brand-500" /><span>Cloud Sync across devices</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-brand-500" /><span>Batch processing operations</span></li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade("pro")}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all"
          >
            {loading ? "Processing..." : "Upgrade to Pro"}
          </button>
        </div>

        {/* DEVELOPER PLAN */}
        <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Developer</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">For engineering teams & API access</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$12.99</span>
              <span className="text-xs text-gray-500">/ month ($99/yr)</span>
            </div>
            <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-100 dark:border-gray-800">
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-purple-500" /><span>Everything in Pro</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-purple-500" /><span>REST API keys & programmatic access</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-purple-500" /><span>Higher execution rate limits</span></li>
              <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-purple-500" /><span>Team Workspaces (Up to 5 members)</span></li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade("developer")}
            disabled={loading}
            className="w-full py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {loading ? "Processing..." : "Get Developer Plan"}
          </button>
        </div>
      </div>
    </div>
  );
}
