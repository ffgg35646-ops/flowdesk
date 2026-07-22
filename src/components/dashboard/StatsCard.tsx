// src/components/dashboard/StatsCard.tsx

"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    label?: string;
    positive?: boolean;
  };
  loading?: boolean;
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  loading = false,
}: StatsCardProps) {
  if (loading) {
    return (
      <div className="rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-slate-200 dark:bg-white/10" />
          <div className="h-10 w-24 rounded bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/70">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-indigo-500/10 opacity-0 transition group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h3 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}

          {trend && (
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  trend.positive
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {trend.value}
              </span>

              <span className="text-xs text-slate-500 dark:text-slate-400">
                {trend.label || "Compared to previous period"}
              </span>
            </div>
          )}
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
}
