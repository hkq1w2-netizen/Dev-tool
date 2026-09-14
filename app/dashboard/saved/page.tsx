"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, FileCode, Copy, Trash2 } from "lucide-react";

interface SavedProjectItem {
  _id: string;
  toolSlug: string;
  name: string;
  input: string;
  output: string;
  createdAt: string;
}

export default function SavedProjectsPage() {
  const [projects, setProjects] = useState<SavedProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProjects(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Projects & Results</h1>
        <p className="text-xs text-gray-500">Access your saved tool calculations, JSON outputs, and snippets.</p>
      </div>

      {loading ? (
        <div className="text-center py-8 text-xs text-gray-500">Loading saved projects...</div>
      ) : projects.length === 0 ? (
        <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-center text-gray-500 text-sm">
          No saved projects yet. Click &quot;Save Result&quot; inside any tool to bookmark outputs here.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj._id} className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bookmark className="w-4 h-4 text-emerald-500" />
                  <h2 className="font-bold text-sm text-gray-900 dark:text-white">{proj.name}</h2>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
                  {proj.toolSlug}
                </span>
              </div>
              <textarea
                readOnly
                value={proj.output}
                rows={4}
                className="w-full p-3 font-mono text-xs rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-300 outline-none resize-none"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-gray-400">{new Date(proj.createdAt).toLocaleDateString()}</span>
                <Link href={`/tools/${proj.toolSlug}`} className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline">
                  Open in Tool →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
