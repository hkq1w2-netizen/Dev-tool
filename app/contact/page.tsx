"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Contact Support & Feedback
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Have a feature request, bug report, or billing inquiry? Send us a message.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
          <h2 className="font-bold text-lg text-emerald-800 dark:text-emerald-300">Message Received!</h2>
          <p className="text-xs text-emerald-700 dark:text-emerald-400">
            Thank you for reaching out. Our engineering team will review your inquiry shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Name</label>
              <input type="text" required placeholder="Alex" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" required placeholder="alex@example.com" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Category</label>
            <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm outline-none">
              <option>General Inquiry</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>Billing & Subscription</option>
              <option>Security Vulnerability</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">Message</label>
            <textarea rows={5} required placeholder="Tell us how we can help..." className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm outline-none resize-y" />
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md flex items-center justify-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </div>
  );
}
