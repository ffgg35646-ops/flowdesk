// src/app/projects/[id]/page.tsx

"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FolderKanban,
  Users,
  CalendarDays,
  CheckSquare,
  FileText,
} from "lucide-react";

export default function ProjectDetailsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1400px]">


        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>



        <div className="rounded-3xl border border-white/20 bg-white/70 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


          <div className="flex flex-col gap-6 md:flex-row md:items-center">


            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

              <FolderKanban className="h-10 w-10" />

            </div>



            <div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Project Details
              </h1>

              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Project information and workspace activities.
              </p>

            </div>


          </div>





          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">


            <InfoCard
              icon={Users}
              title="Team"
              value="Not loaded"
            />


            <InfoCard
              icon={CalendarDays}
              title="Timeline"
              value="Not loaded"
            />


            <InfoCard
              icon={CheckSquare}
              title="Tasks"
              value="Not loaded"
            />


            <InfoCard
              icon={FileText}
              title="Files"
              value="Not loaded"
            />


          </div>





          <div className="mt-8 grid gap-6 lg:grid-cols-2">


            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">

              <h2 className="font-bold text-slate-900 dark:text-white">
                Description
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Project description will be loaded from the database.
              </p>

            </section>





            <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">

              <h2 className="font-bold text-slate-900 dark:text-white">
                Activity
              </h2>

              <p className="mt-3 text-sm text-slate-400">
                Project activity history will appear here.
              </p>

            </section>


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
