// src/components/dashboard/ProjectSummary.tsx

"use client";

import Link from "next/link";
import {
  ArrowRight,
  FolderKanban,
  Users,
  CalendarDays,
} from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  members?: number;
  deadline?: string;
}

interface ProjectSummaryProps {
  projects?: Project[];
  loading?: boolean;
}

export default function ProjectSummary({
  projects = [],
  loading = false,
}: ProjectSummaryProps) {
  return (
    <section className="rounded-3xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
            <FolderKanban className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Projects Overview
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Monitor active projects and progress
            </p>
          </div>
        </div>

        <Link
          href="/projects"
          className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-500/10"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>


      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10">
          <FolderKanban className="h-10 w-10 text-slate-400" />

          <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
            No projects available
          </p>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Projects will appear after creation
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-slate-100 bg-white/60 p-5 transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {project.status}
                  </p>
                </div>

                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-400">
                  {project.progress}%
                </span>
              </div>


              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>


              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                {project.members !== undefined && (
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {project.members} Members
                  </span>
                )}

                {project.deadline && (
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {project.deadline}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
