// src/components/home/HeroSection.tsx

"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/10 via-transparent to-indigo-600/10" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-sm font-medium text-violet-700 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-violet-400">
            <Building2 className="h-4 w-4" />
            Enterprise Business Management
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl dark:text-white">
            Manage your company
            <br />
            in one powerful workspace
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            FlowDesk is a modern platform for managing teams,
            projects, tasks, clients and business operations
            from one centralized workspace.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-7 py-4 font-semibold text-white transition hover:scale-[1.02] dark:bg-white dark:text-slate-900"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-slate-200 bg-white/70 px-7 py-4 text-center font-semibold text-slate-900 backdrop-blur-xl transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-10 space-y-3">
            <Feature text="Centralized company workspace" />
            <Feature text="Team and project management" />
            <Feature text="Secure role-based access" />
          </div>
        </div>


        <div className="relative">
          <div className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
              <div>
                <p className="text-sm text-slate-500">
                  Workspace
                </p>

                <h3 className="font-bold text-slate-900 dark:text-white">
                  FlowDesk Dashboard
                </h3>
              </div>

              <div className="h-10 w-10 rounded-xl bg-violet-600" />
            </div>


            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <PreviewCard title="Projects" />
              <PreviewCard title="Tasks" />
              <PreviewCard title="Employees" />
              <PreviewCard title="Reports" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      {text}
    </div>
  );
}


function PreviewCard({
  title,
}: {
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
      <div className="h-8 w-8 rounded-lg bg-violet-500/20" />

      <p className="mt-4 font-semibold text-slate-900 dark:text-white">
        {title}
      </p>

      <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-white/10" />
    </div>
  );
}
