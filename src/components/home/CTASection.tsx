// src/components/home/CTASection.tsx

"use client";

import Link from "next/link";
import {
  ArrowRight,
  Rocket,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-violet-600 to-indigo-700 px-8 py-12 shadow-2xl backdrop-blur-xl md:px-12">
          
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white/80">
                <Rocket className="h-5 w-5" />
                Start using FlowDesk
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Build a smarter workflow for your company
              </h2>

              <p className="mt-4 text-white/80">
                Create your workspace, organize your teams and
                manage your business operations from one platform.
              </p>
            </div>


            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3 font-semibold text-violet-700 transition hover:scale-[1.02]"
              >
                Create Workspace
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/login"
                className="rounded-2xl border border-white/30 px-7 py-3 text-center font-semibold text-white transition hover:bg-white/10"
              >
                Login
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
