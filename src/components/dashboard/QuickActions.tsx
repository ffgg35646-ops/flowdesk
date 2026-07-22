"use client";

import { useRouter } from "next/navigation";
import {
  FolderPlus,
  UserPlus,
  CheckSquare,
  BarChart3,
} from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Create Project",
      desc: "Create a new project",
      icon: FolderPlus,
      action: () => router.push("/projects"),
    },
    {
      title: "Manage Team",
      desc: "View your team",
      icon: UserPlus,
      action: () => router.push("/team"),
    },
    {
      title: "Tasks",
      desc: "Manage tasks",
      icon: CheckSquare,
      action: () => router.push("/tasks"),
    },
    {
      title: "Reports",
      desc: "Company reports",
      icon: BarChart3,
      action: () => router.push("/reports"),
    },
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 shadow p-6">
      <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={item.action}
              className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-violet-600 hover:text-white transition-all p-5 text-left"
            >
              <Icon className="h-8 w-8 mb-3" />

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm opacity-80">
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
