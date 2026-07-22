// src/app/team/[id]/page.tsx

"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Shield,
  User,
  Building2,
} from "lucide-react";

export default function TeamMemberPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1200px]">

        <Link
          href="/team"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Team
        </Link>



        <div className="rounded-3xl border border-white/20 bg-white/70 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <User className="h-12 w-12" />
            </div>


            <div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Team Member
              </h1>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Member details and company role information.
              </p>

            </div>

          </div>



          <div className="mt-10 grid gap-6 md:grid-cols-2">


            <InfoCard
              icon={User}
              title="Name"
              value="Not loaded"
            />


            <InfoCard
              icon={Mail}
              title="Email"
              value="Not loaded"
            />


            <InfoCard
              icon={Shield}
              title="Role"
              value="Not loaded"
            />


            <InfoCard
              icon={Building2}
              title="Department"
              value="Not loaded"
            />


          </div>



          <div className="mt-8 rounded-2xl border border-dashed border-slate-200 p-6 dark:border-white/10">

            <h2 className="font-bold text-slate-900 dark:text-white">
              Activity
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Member activities will appear here after connecting the employee API.
            </p>

          </div>


        </div>

      </div>

    </main>
  );
}



function InfoCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">

      <div className="flex items-center gap-3">

        <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />

        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {title}
        </span>

      </div>


      <p className="mt-3 text-sm text-slate-400">
        {value}
      </p>

    </div>
  );
}
