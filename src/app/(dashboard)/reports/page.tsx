// src/app/reports/page.tsx

"use client";

import {
  BarChart3,
  FileBarChart,
  Download,
  Activity,
} from "lucide-react";

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1600px]">


        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Reports
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Analyze company performance and workspace activity.
          </p>

        </div>





        <div className="grid gap-6 lg:grid-cols-3">


          <ReportCard
            icon={BarChart3}
            title="Performance Reports"
            description="Track business performance and operational progress."
          />


          <ReportCard
            icon={Activity}
            title="Activity Reports"
            description="Review team and workspace activities."
          />


          <ReportCard
            icon={FileBarChart}
            title="Custom Reports"
            description="Generate reports based on your company data."
          />


        </div>






        <div className="mt-8 rounded-3xl border border-white/20 bg-white/70 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-20 dark:border-white/10">


            <BarChart3 className="h-12 w-12 text-slate-300" />


            <h2 className="mt-4 font-bold text-slate-900 dark:text-white">
              No Reports Available
            </h2>


            <p className="mt-2 text-center text-sm text-slate-400">
              Reports will be generated when company data becomes available.
            </p>


            <button
              className="mt-6 flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white dark:bg-white dark:text-slate-900"
            >
              <Download className="h-5 w-5" />
              Export Report
            </button>


          </div>


        </div>


      </div>

    </main>
  );
}




function ReportCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

        <Icon className="h-6 w-6" />

      </div>


      <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>


    </div>
  );
}
