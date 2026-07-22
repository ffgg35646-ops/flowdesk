// src/app/(dashboard)/dashboard/page.tsx

"use client";

import {
  BriefcaseBusiness,
  CheckSquare,
  Users,
  Building2,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import ProjectSummary from "@/components/dashboard/ProjectSummary";
import TaskWidget from "@/components/dashboard/TaskWidget";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import QuickActions from "@/components/dashboard/QuickActions";


export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1600px]">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your company workspace and daily operations.
          </p>

        </div>



        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Projects"
            value={0}
            icon={BriefcaseBusiness}
          />


          <StatsCard
            title="Tasks"
            value={0}
            icon={CheckSquare}
          />


          <StatsCard
            title="Employees"
            value={0}
            icon={Users}
          />


          <StatsCard
            title="Company"
            value={0}
            icon={Building2}
          />

        </div>



        {/* Main Grid */}
        <div className="mt-8 grid gap-6 xl:grid-cols-3">


          <div className="space-y-6 xl:col-span-2">

            <ProjectSummary />

            <TaskWidget />

          </div>



          <div className="space-y-6">

            <QuickActions />

            <ActivityFeed />

          </div>


        </div>


      </div>

    </main>
  );
}
