"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";

export default function ContactClient() {
  const [category, setCategory] = useState("Bug report");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (website) return;
    const subject = encodeURIComponent(`[${category}] DevKitLab feedback`);
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:support@devkitlab.online?subject=${subject}&body=${body}`;
  };

  return <div className="mx-auto max-w-2xl space-y-8 py-8">
    <div className="text-center"><h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">Contact DevKitLab</h1><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Report a bug, suggest a tool, flag an incorrect result, or ask a general question.</p></div>
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Your email"><input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="field" /></Field><Field label="Topic"><select value={category} onChange={(event) => setCategory(event.target.value)} className="field"><option>Bug report</option><option>Feature suggestion</option><option>Incorrect result report</option><option>General question</option><option>Business inquiry</option><option>Security report</option></select></Field></div>
      <Field label="Message"><textarea rows={6} required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="For bugs, include the tool name and steps to reproduce." className="field resize-y" /></Field>
      <label className="absolute -left-[9999px]" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"><Send className="h-4 w-4" />Open email app</button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500"><Mail className="h-3.5 w-3.5" />This opens your email application; the site does not pretend to submit a message.</p>
      <style jsx>{`.field{width:100%;border:1px solid rgb(203 213 225);border-radius:.625rem;background:white;padding:.7rem .8rem;font-size:.875rem;outline:none}.field:focus{border-color:rgb(59 130 246);box-shadow:0 0 0 3px rgb(59 130 246 / .12)}:global(.dark) .field{border-color:rgb(51 65 85);background:rgb(2 6 23);color:white}`}</style>
    </form>
  </div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block space-y-1.5"><span className="text-xs font-bold text-slate-700 dark:text-slate-300">{label}</span>{children}</label>; }
