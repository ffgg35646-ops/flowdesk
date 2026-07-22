// src/app/settings/page.tsx

"use client";

import {
  Settings,
  ShieldCheck,
  Bell,
  Palette,
  Lock,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1200px]">


        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your workspace preferences and account settings.
          </p>

        </div>







        <div className="grid gap-6">


          <SettingCard
            icon={Settings}
            title="Workspace Settings"
            description="Manage general workspace configuration."
          />


          <SettingCard
            icon={ShieldCheck}
            title="Security"
            description="Manage authentication and security preferences."
          />


          <SettingCard
            icon={Bell}
            title="Notifications"
            description="Control notification preferences."
          />


          <SettingCard
            icon={Palette}
            title="Appearance"
            description="Customize the interface appearance."
          />


          <SettingCard
            icon={Lock}
            title="Privacy"
            description="Manage account privacy options."
          />


        </div>





      </div>

    </main>
  );
}





function SettingCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl transition hover:border-violet-300 dark:border-white/10 dark:bg-slate-900/70 md:flex-row md:items-center">


      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

        <Icon className="h-6 w-6" />

      </div>



      <div>

        <h2 className="font-bold text-slate-900 dark:text-white">
          {title}
        </h2>


        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>


      </div>


    </div>
  );
}
