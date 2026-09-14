"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History as HistoryIcon, Clock, ArrowRight } from "lucide-react";

interface HistoryItem {
  _id: string;
  toolSlug: string;
  action: string;
  createdAt: string;
}

export default function UserHistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setItems(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tool Execution History</h1>
        <p className="text-xs text-gray-500">Log of recent developer tools executed in your sessions.</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-xs text-gray-500">Loading history...</div>
      ) : items.length === 0 ? (
        <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center text-gray-500 text-sm">
          No tool executions logged yet. Use any tool while signed in to log history.
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 overflow-hidden">
          {items.map((item) => (
            <div key={item._id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-gray-900 dark:text-gray-100 font-mono">
                    {item.toolSlug}
                  </h2>
                  <span className="text-xs text-gray-500">Action: {item.action}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span>{new Date(item.createdAt).toLocaleString()}</span>
                <Link href={`/tools/${item.toolSlug}`} className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                  Launch →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
