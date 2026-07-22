// src/components/layout/Footer.tsx

"use client";

import Link from "next/link";
import {
  Globe,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 px-6 py-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            FlowDesk
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Enterprise workspace platform for managing teams,
            projects and business operations.
          </p>
        </div>


        <div className="flex flex-wrap items-center gap-3">

          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <Globe className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </Link>


          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </Link>


          <Link
            href="#"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <Mail className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </Link>

        </div>
      </div>


      <div className="mx-auto mt-8 max-w-[1600px] border-t border-slate-200 pt-6 text-center dark:border-white/10">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} FlowDesk. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
