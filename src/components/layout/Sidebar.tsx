// src/components/layout/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FolderKanban,
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  Users,
  Building2,
  BarChart3,
  Clock3,
  FileText,
  CreditCard,
  LifeBuoy,
  Star,
  Archive,
  Sparkles,
  Plus,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};


const navGroups: NavGroup[] = [
  {
    title: "Workspace",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
      {
        label: "Tasks",
        href: "/tasks",
        icon: CheckSquare,
      },
      {
        label: "Calendar",
        href: "/calendar",
        icon: CalendarDays,
      },
    ],
  },

  {
    title: "Management",
    items: [
      {
        label: "Company",
        href: "/company",
        icon: Building2,
      },
      {
        label: "Team",
        href: "/team",
        icon: Users,
      },
      {
        label: "Reports",
        href: "/reports",
        icon: BarChart3,
      },
      {
        label: "Activity",
        href: "/activity",
        icon: Clock3,
      },
    ],
  },

  {
    title: "Resources",
    items: [
      {
        label: "Documents",
        href: "/documents",
        icon: FileText,
      },
      {
        label: "Invoices",
        href: "/invoices",
        icon: CreditCard,
      },
      {
        label: "Archive",
        href: "/archive",
        icon: Archive,
      },
      {
        label: "Support",
        href: "/support",
        icon: LifeBuoy,
      },
    ],
  },
];


export default function Sidebar() {

  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);


  const [openGroups, setOpenGroups] = useState({
    Workspace: true,
    Management: true,
    Resources: true,
  });


  const initials = useMemo(() => {
    return "FD";
  }, []);



  function toggleGroup(title: string) {

    setOpenGroups((prev) => ({
      ...prev,
      [title]: !prev[title as keyof typeof prev],
    }));

  }



  return (

    <aside
      className={`
        hidden lg:flex h-screen sticky top-0 flex-col
        border-r border-white/20
        bg-white/70 backdrop-blur-3xl
        dark:bg-slate-950/70 dark:border-white/10
        transition-all duration-300
        ${collapsed ? "w-24" : "w-80"}
      `}
    >


      <div className="flex items-center justify-between border-b border-white/10 p-6">


        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white">

            <Sparkles className="h-6 w-6" />

          </div>


          {!collapsed && (

            <div>

              <h2 className="font-bold text-slate-900 dark:text-white">
                FlowDesk
              </h2>

              <p className="text-xs text-slate-500">
                Enterprise
              </p>

            </div>

          )}

        </div>



        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-white/5"
        >

          {collapsed ? (
            <ChevronsRight />
          ) : (
            <ChevronsLeft />
          )}

        </button>


      </div>





      <div className="flex-1 overflow-y-auto px-4 py-6">


        {!collapsed && (

  <Link
    href="/projects/new"
    className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
  >
    <Plus className="h-5 w-5" />
    New Project
  </Link>

)}






        <nav className="space-y-6">


          {navGroups.map((group) => (

            <div key={group.title}>


              {!collapsed && (

                <button
                  onClick={() => toggleGroup(group.title)}
                  className="mb-3 flex w-full items-center justify-between px-3 text-xs font-semibold uppercase text-slate-400"
                >

                  {group.title}


                  {openGroups[group.title as keyof typeof openGroups] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}

                </button>

              )}




              {(collapsed ||
                openGroups[group.title as keyof typeof openGroups]) && (

                <div className="space-y-1">


                  {group.items.map((item) => {

                    const Icon = item.icon;

                    const active =
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/");


                    return (

                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition
                          ${
                            active
                              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                              : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-white/5"
                          }
                          ${collapsed ? "justify-center" : ""}
                        `}
                      >

                        <Icon className="h-5 w-5" />


                        {!collapsed && item.label}


                      </Link>

                    );

                  })}


                </div>

              )}


            </div>

          ))}


        </nav>





        {!collapsed && (

          <div className="mt-8 rounded-3xl border border-white/20 bg-violet-500/10 p-5">

            <div className="flex items-center gap-3">

              <Star className="h-5 w-5 text-violet-600" />

              <p className="text-sm font-semibold">
                Upgrade Plan
              </p>

            </div>

          </div>

        )}



      </div>




      <div className="border-t border-white/10 p-4">

        <div className="flex items-center gap-3 rounded-2xl bg-white/50 p-3 dark:bg-white/5">


          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white">

            {initials}

          </div>



          {!collapsed && (

            <div>

              <p className="text-sm font-semibold">
                User
              </p>

              <p className="text-xs text-slate-500">
                Account
              </p>

            </div>

          )}


        </div>

      </div>


    </aside>

  );
}
