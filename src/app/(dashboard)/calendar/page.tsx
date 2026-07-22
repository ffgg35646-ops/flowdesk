// src/app/calendar/page.tsx

"use client";
import Link from "next/link";
import {
  CalendarDays,
  Plus,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1600px]">


        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Calendar
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Organize meetings, deadlines and company events.
            </p>
          </div>


        <Link
  href="/calendar/new"
  className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] dark:bg-white dark:text-slate-900"
>
  <Plus className="h-5 w-5" />
  Create Event
</Link>


        </div>






        <div className="grid gap-6 lg:grid-cols-4">


          <CalendarCard
            icon={CalendarDays}
            title="Schedule"
            text="Manage upcoming events and meetings."
          />


          <CalendarCard
            icon={Clock}
            title="Deadlines"
            text="Track important project deadlines."
          />


          <CalendarCard
            icon={CheckCircle2}
            title="Tasks"
            text="Review scheduled tasks."
          />


          <CalendarCard
            icon={CalendarDays}
            title="Events"
            text="Company activities and appointments."
          />


        </div>







        <div className="mt-8 rounded-3xl border border-white/20 bg-white/70 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10">


            <CalendarDays className="h-14 w-14 text-slate-300" />


            <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No Events Available
            </h2>


            <p className="mt-2 text-sm text-slate-400">
              Calendar events will appear after connecting your workspace data.
            </p>


          </div>


        </div>


      </div>

    </main>
  );
}





function CalendarCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

        <Icon className="h-6 w-6" />

      </div>


      <h3 className="mt-5 font-bold text-slate-900 dark:text-white">
        {title}
      </h3>


      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        {text}
      </p>


    </div>
  );
}
