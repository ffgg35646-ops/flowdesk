// src/components/dashboard/TaskWidget.tsx

"use client";

import {
  CheckCircle2,
  Clock3,
  ListTodo,
  AlertCircle,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "completed" | "pending" | "in-progress";
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}

interface TaskWidgetProps {
  tasks?: Task[];
  loading?: boolean;
}

export default function TaskWidget({
  tasks = [],
  loading = false,
}: TaskWidgetProps) {
  return (
    <section className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">
          <ListTodo className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Tasks
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track assigned tasks and progress
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5"
            />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
          <ListTodo className="h-10 w-10 text-slate-400" />

          <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
            No tasks available
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tasks will appear when assigned
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/60 p-4 transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3">
                {task.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : task.status === "in-progress" ? (
                  <Clock3 className="h-5 w-5 text-blue-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                )}

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {task.title}
                  </h3>

                  {task.dueDate && (
                    <p className="mt-1 text-xs text-slate-500">
                      Due {task.dueDate}
                    </p>
                  )}
                </div>
              </div>

              {task.priority && (
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                      : task.priority === "medium"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  }`}
                >
                  {task.priority}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
