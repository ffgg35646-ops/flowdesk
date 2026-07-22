// src/components/layout/PublicNavbar.tsx

"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          FlowDesk
        </Link>


        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:opacity-90 dark:bg-white dark:text-slate-900"
          >
            Register
          </Link>

        </nav>


        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl p-2 md:hidden"
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

      </div>



      {open && (

        <div className="border-t border-slate-200 px-6 py-4 md:hidden dark:border-white/10">

          <div className="flex flex-col gap-4">

            <Link href="/">
              Home
            </Link>

            <Link href="/login">
              Login
            </Link>

            <Link href="/register">
              Register
            </Link>

          </div>

        </div>

      )}

    </header>
  );
}
