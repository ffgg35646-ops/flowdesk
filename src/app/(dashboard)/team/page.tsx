"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  ShieldCheck,
  Search,
} from "lucide-react";

type Member = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
};

export default function TeamPage() {

  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {

    const data = JSON.parse(
      localStorage.getItem("team") || "[]"
    );

    setMembers(data);

  }, []);


  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1600px]">


        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">


          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Team
            </h1>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Manage employees, roles and team members.
            </p>
          </div>


          <Link
            href="/team/new"
            className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white dark:bg-white dark:text-slate-900"
          >
            <UserPlus className="h-5 w-5" />
            Add Member
          </Link>


        </div>




        <div className="mb-6 flex gap-4 rounded-3xl border bg-white/70 p-5 backdrop-blur-xl dark:bg-slate-900/70">


          <div className="relative flex-1">

            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

            <input
              placeholder="Search team members..."
              className="w-full rounded-2xl border py-3 pl-12 pr-4 dark:bg-white/5"
            />

          </div>


        </div>




        <div className="rounded-3xl border bg-white/70 p-6 dark:bg-slate-900/70">


          <div className="mb-6 flex items-center gap-3">

            <Users className="h-6 w-6 text-violet-600" />

            <h2 className="font-bold">
              Company Members
            </h2>

          </div>




          {members.length === 0 ? (

            <div className="flex min-h-48 items-center justify-center border border-dashed rounded-2xl">

              <div className="text-center">

                <ShieldCheck className="mx-auto h-10 w-10 text-slate-300"/>

                <p className="mt-3 text-sm text-slate-400">
                  No team members loaded yet.
                </p>

              </div>

            </div>

          ) : (

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

              {members.map((member)=>(
                <div
                  key={member.id}
                  className="rounded-2xl border p-5"
                >

                  <h3 className="font-bold">
                    {member.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {member.email}
                  </p>

                  <p className="mt-3 text-sm">
                    Role: {member.role}
                  </p>

                  <p className="text-sm">
                    Department: {member.department}
                  </p>

                </div>
              ))}

            </div>

          )}


        </div>


      </div>

    </main>
  );
}
