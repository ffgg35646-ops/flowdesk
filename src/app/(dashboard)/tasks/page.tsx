"use client";

import Link from "next/link";
import {
  CheckSquare,
  Plus,
  Search,
  Clock,
  ListTodo,
} from "lucide-react";

export default function TasksPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1600px]">

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Tasks
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Create, assign and track company tasks.
            </p>
          </div>


          <Link
            href="/tasks/new"
            className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] dark:bg-white dark:text-slate-900"
          >
            <Plus className="h-5 w-5" />

            Create Task

          </Link>


        </div>




        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/70 p-5 backdrop-blur-xl md:flex-row dark:border-white/10 dark:bg-slate-900/70">


          <div className="relative flex-1">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <input
              placeholder="Search tasks..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />

          </div>



          <button className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 dark:border-white/10 dark:text-slate-300">
            Filter
          </button>


        </div>





        <div className="grid gap-6 lg:grid-cols-3">


          <TaskColumn
            title="To Do"
            icon={ListTodo}
          />


          <TaskColumn
            title="In Progress"
            icon={Clock}
          />


          <TaskColumn
            title="Completed"
            icon={CheckSquare}
          />


        </div>



      </div>

    </main>
  );
}





function TaskColumn({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

          <Icon className="h-5 w-5" />

        </div>


        <h2 className="font-bold text-slate-900 dark:text-white">
          {title}
        </h2>


      </div>




      <div className="mt-6 flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10">


        <p className="text-sm text-slate-400">
          No tasks loaded yet.
        </p>


      </div>



    </div>
  );
}
