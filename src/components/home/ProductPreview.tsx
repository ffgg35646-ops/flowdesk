// src/components/home/ProductPreview.tsx

"use client";

import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  Users,
} from "lucide-react";

export default function ProductPreview() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            A workspace built for modern teams
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            Manage your business operations through a unified
            workspace designed for teams and organizations.
          </p>
        </div>


        <div className="rounded-3xl border border-white/20 bg-white/70 p-5 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
          
          <div className="flex flex-col gap-6 lg:flex-row">
            
            <div className="w-full rounded-2xl bg-slate-900 p-5 lg:w-64">
              <div className="mb-8 h-8 w-32 rounded-lg bg-white/20" />

              <div className="space-y-4">
                <MenuItem icon={FolderKanban} text="Projects" />
                <MenuItem icon={CheckSquare} text="Tasks" />
                <MenuItem icon={Users} text="Team" />
                <MenuItem icon={BarChart3} text="Reports" />
              </div>
            </div>


            <div className="flex-1 space-y-6">
              
              <div className="grid gap-4 md:grid-cols-3">
                <Card title="Projects" />
                <Card title="Tasks" />
                <Card title="Employees" />
              </div>


              <div className="rounded-2xl border border-slate-100 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Workspace Overview
                  </h3>

                  <div className="h-8 w-20 rounded-lg bg-violet-500/20" />
                </div>

                <div className="mt-6 space-y-3">
                  <Line />
                  <Line />
                  <Line />
                  <Line />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


function MenuItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/80">
      <Icon className="h-5 w-5" />
      {text}
    </div>
  );
}


function Card({
  title,
}: {
  title: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/60 p-5 dark:border-white/10 dark:bg-white/5">
      <div className="h-10 w-10 rounded-xl bg-violet-500/20" />

      <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
        {title}
      </p>

      <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-white/10" />
    </div>
  );
}


function Line() {
  return (
    <div className="h-3 rounded-full bg-slate-100 dark:bg-white/10" />
  );
}
