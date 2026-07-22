// src/components/home/FeaturesSection.tsx

"use client";

import {
  FolderKanban,
  CheckSquare,
  Users,
  Building2,
  FileText,
  Bell,
} from "lucide-react";

const features = [
  {
    title: "Project Management",
    description:
      "Create, organize and track company projects with a structured workflow.",
    icon: FolderKanban,
  },
  {
    title: "Task Management",
    description:
      "Assign tasks, monitor progress and keep teams aligned.",
    icon: CheckSquare,
  },
  {
    title: "Team Management",
    description:
      "Manage employees, roles and company departments.",
    icon: Users,
  },
  {
    title: "Company Workspace",
    description:
      "Control your organization from one centralized platform.",
    icon: Building2,
  },
  {
    title: "Clients & Invoices",
    description:
      "Manage clients and business financial operations.",
    icon: FileText,
  },
  {
    title: "Notifications",
    description:
      "Stay updated with important workspace activities.",
    icon: Bell,
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
            Everything your company needs
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            FlowDesk brings essential business management tools
            together in one professional workspace.
          </p>
        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-500/10 dark:text-violet-400">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
