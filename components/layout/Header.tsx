"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Search, Sun, Wrench, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/tools#categories", label: "Categories" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("devkitlab-theme", next ? "dark" : "light");
    setDark(next);
  };

  const openSearch = () => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="DevKitLab home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"><Wrench className="h-4.5 w-4.5" /></span>
          <span className="text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">DevKit<span className="text-brand-600">Lab</span></span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("#")[0]);
            return <Link key={item.href} href={item.href} className={`rounded-lg px-3 py-2 text-sm font-medium transition ${active ? "bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white" : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"}`}>{item.label}</Link>;
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <button onClick={openSearch} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:border-slate-300 hover:text-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white" aria-label="Search tools">
            <Search className="h-4 w-4" /><span className="hidden sm:inline">Search</span><kbd className="hidden rounded bg-slate-100 px-1.5 py-0.5 text-[10px] sm:inline dark:bg-slate-800">Ctrl K</kbd>
          </button>
          <button onClick={toggleTheme} className="rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>{dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 md:hidden dark:text-slate-300 dark:hover:bg-slate-800" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>

      {menuOpen && <nav id="mobile-navigation" className="border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800" aria-label="Mobile navigation">{NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">{item.label}</Link>)}<Link href="/contact" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Contact</Link></nav>}
    </header>
  );
}
