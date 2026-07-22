// src/app/(dashboard)/notifications/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  Settings,
  AlertCircle,
} from "lucide-react";

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: string;
  date: string;
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );

    setNotifications(saved);
  }, []);

  function markAllRead() {
    const updated = notifications.map((n) => ({
      ...n,
      read: true,
    }));

    localStorage.setItem(
      "notifications",
      JSON.stringify(updated)
    );

    setNotifications(updated);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">
      <div className="mx-auto max-w-[1600px]">

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Notifications
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              View workspace updates and system notifications.
            </p>
          </div>

          <button
            onClick={markAllRead}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <CheckCheck className="h-5 w-5" />
            Mark All Read
          </button>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <NotificationCard
            icon={Bell}
            title="Updates"
            description={`${notifications.length} notifications`}
          />

          <NotificationCard
            icon={AlertCircle}
            title="Unread"
            description={`${
              notifications.filter((n) => !n.read).length
            } unread`}
          />

          <NotificationCard
            icon={Settings}
            title="System"
            description="Workspace activity"
          />

        </div>

        <div className="mt-8 rounded-3xl border border-white/20 bg-white/70 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">

          {notifications.length === 0 ? (

            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10">

              <Bell className="h-14 w-14 text-slate-300" />

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                No Notifications
              </h2>

              <p className="mt-2 text-center text-sm text-slate-400">
                Notifications will appear when there are updates in your workspace.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {notifications.map((item) => (

                <div
                  key={item.id}
                  className={`rounded-2xl border p-5 ${
                    item.read
                      ? "border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
                      : "border-violet-400 bg-violet-50 dark:border-violet-500 dark:bg-violet-500/10"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {item.message}
                      </p>
                    </div>

                    <span className="text-xs text-slate-400">
                      {item.date}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </main>
  );
}

function NotificationCard({
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
