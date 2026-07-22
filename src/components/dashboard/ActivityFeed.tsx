// src/components/dashboard/ActivityFeed.tsx

"use client";

import {
  Activity,
  Clock,
  User,
} from "lucide-react";

interface ActivityItem {
  id: string;
  user?: string;
  action: string;
  target?: string;
  time?: string;
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
  loading?: boolean;
}

export default function ActivityFeed({
  activities = [],
  loading = false,
}: ActivityFeedProps) {
  return (
    <section className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
          <Activity className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Activity Feed
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recent workspace activity
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5"
            />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
          <Activity className="h-10 w-10 text-slate-400" />

          <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
            No recent activity
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Workspace actions will appear here
          </p>
        </div>
      ) : (
        <div className="relative space-y-5">
          <div className="absolute left-5 top-5 h-[calc(100%-40px)] w-px bg-slate-200 dark:bg-white/10" />

          {activities.map((item) => (
            <div
              key={item.id}
              className="relative flex gap-4"
            >
              <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
                <User className="h-5 w-5" />
              </div>

              <div className="flex-1 rounded-2xl border border-slate-100 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.user || "User"}
                  </span>{" "}
                  {item.action}{" "}
                  {item.target && (
                    <span className="font-semibold text-violet-600 dark:text-violet-400">
                      {item.target}
                    </span>
                  )}
                </p>

                {item.time && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {item.time}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
