// src/components/home/WorkflowSection.tsx

"use client";

import {
  Building2,
  Users,
  FolderKanban,
  CheckSquare,
  BarChart3,
} from "lucide-react";

const steps = [
  {
    title: "Create Company",
    description:
      "Set up your organization workspace and define your structure.",
    icon: Building2,
  },
  {
    title: "Build Your Team",
    description:
      "Add employees and organize departments with clear roles.",
    icon: Users,
  },
  {
    title: "Manage Projects",
    description:
      "Create projects and connect teams with business goals.",
    icon: FolderKanban,
  },
  {
    title: "Track Tasks",
    description:
      "Assign work, follow progress and manage daily operations.",
    icon: CheckSquare,
  },
  {
    title: "Analyze Results",
    description:
      "Review performance and improve your workflow.",
    icon: BarChart3,
  },
];

export default function WorkflowSection() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            How FlowDesk works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
            A simple workflow that connects your company,
            teams and daily operations.
          </p>
        </div>


        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70"
              >
                <div className="absolute right-5 top-5 text-5xl font-bold text-slate-100 dark:text-white/5">
                  {index + 1}
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
