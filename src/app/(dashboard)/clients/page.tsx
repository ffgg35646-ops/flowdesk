// src/app/clients/page.tsx

"use client";

import {
  UsersRound,
  Plus,
  Search,
  Mail,
  Building2,
} from "lucide-react";

export default function ClientsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1600px]">


        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Clients
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage your business clients and contacts.
            </p>
          </div>


          <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] dark:bg-white dark:text-slate-900">

            <Plus className="h-5 w-5" />

            Add Client

          </button>

        </div>





        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/70 p-5 backdrop-blur-xl md:flex-row dark:border-white/10 dark:bg-slate-900/70">


          <div className="relative flex-1">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <input
              placeholder="Search clients..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />

          </div>


        </div>





        <div className="rounded-3xl border border-white/20 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


          <div className="mb-6 flex items-center gap-3">


            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">

              <UsersRound className="h-6 w-6" />

            </div>



            <div>

              <h2 className="font-bold text-slate-900 dark:text-white">
                Client Directory
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Client information will be loaded from your database.
              </p>

            </div>


          </div>






          <div className="flex min-h-60 items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10">


            <div className="text-center">

              <Building2 className="mx-auto h-10 w-10 text-slate-300" />


              <p className="mt-3 text-sm text-slate-400">
                No clients loaded yet.
              </p>


            </div>


          </div>


        </div>






      </div>

    </main>
  );
}
