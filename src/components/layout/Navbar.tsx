"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  Bell,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Command,
  CreditCard,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  PanelLeft,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
  Users,
  X,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";


type Workspace = {
  id: string;
  name: string;
  plan: string;
  color: string;
};


type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
};


type NavItem = {
  label: string;
  href: string;
};



const workspaces: Workspace[] = [
  {
    id: "1",
    name: "FlowDesk",
    plan: "Enterprise",
    color: "from-violet-500 to-indigo-600",
  },
];



const notifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to FlowDesk",
    description: "Your workspace has been created successfully.",
    time: "Now",
    unread: true,
  },
  {
    id: "2",
    title: "Profile setup",
    description: "Complete your profile information.",
    time: "Today",
    unread: true,
  },
];



const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Tasks",
    href: "/tasks",
  },
  {
    label: "Teams",
    href: "/team",
  },
  {
    label: "Reports",
    href: "/reports",
  },
];



export default function Navbar() {

  const pathname = usePathname();


  const {
    user,
    logout,
  } = useAuth();



  const [mobileOpen,setMobileOpen] = useState(false);

  const [search,setSearch] = useState("");

  const [workspaceOpen,setWorkspaceOpen] = useState(false);

  const [notificationOpen,setNotificationOpen] = useState(false);

  const [userOpen,setUserOpen] = useState(false);

  const [darkMode,setDarkMode] = useState(false);



  const [selectedWorkspace,setSelectedWorkspace] =
    useState(workspaces[0]);



  const workspaceRef = useRef<HTMLDivElement>(null);

  const notificationRef = useRef<HTMLDivElement>(null);

  const userRef = useRef<HTMLDivElement>(null);



  useEffect(()=>{

    function handleClick(event:MouseEvent){

      const target = event.target as Node;


      if(
        workspaceRef.current &&
        !workspaceRef.current.contains(target)
      ){
        setWorkspaceOpen(false);
      }


      if(
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ){
        setNotificationOpen(false);
      }


      if(
        userRef.current &&
        !userRef.current.contains(target)
      ){
        setUserOpen(false);
      }

    }


    window.addEventListener(
      "mousedown",
      handleClick
    );


    return ()=>{
      window.removeEventListener(
        "mousedown",
        handleClick
      );
    };


  },[]);



  const unreadCount = useMemo(()=>{

    return notifications.filter(
      item=>item.unread
    ).length;

  },[]);



  const initials = useMemo(()=>{

    if(!user?.name)
      return "FD";


    return user.name
      .split(" ")
      .map(item=>item[0])
      .join("")
      .slice(0,2)
      .toUpperCase();


  },[user]);



  const toggleTheme = ()=>{
    setDarkMode(prev=>!prev);
  };



  const handleLogout = ()=>{

    logout();

    setUserOpen(false);

  };



  const renderNavLink = (item:NavItem)=>{

    const active =
      pathname === item.href ||
      pathname.startsWith(item.href + "/");


    return (

      <Link
        key={item.href}
        href={item.href}
        className={`
          rounded-xl px-4 py-2 text-sm font-medium transition
          ${
            active
            ? "bg-white/80 text-slate-900 dark:bg-white/10 dark:text-white"
            : "text-slate-600 hover:bg-white/60 dark:text-slate-300"
          }
        `}
      >

        {item.label}

      </Link>

    );

  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70">

      <div className="relative mx-auto flex h-20 w-full max-w-[1700px] items-center justify-between px-4 lg:px-8">


        <div className="flex items-center gap-3">


          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border bg-white/60 lg:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>



          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">

              <Briefcase />

            </div>


            <div className="hidden lg:block">

              <h2 className="font-bold text-slate-900 dark:text-white">
                FlowDesk
              </h2>

              <p className="text-xs text-slate-500">
                Enterprise Workspace
              </p>

            </div>


          </Link>





          <div
            ref={workspaceRef}
            className="relative hidden xl:block"
          >

            <button
              onClick={()=>setWorkspaceOpen(!workspaceOpen)}
              className="ml-5 flex items-center gap-3 rounded-2xl border bg-white/60 px-4 py-2.5"
            >

              <Building2 className="h-5 w-5"/>


              <div className="text-left">

                <p className="text-sm font-semibold">
                  {selectedWorkspace.name}
                </p>

                <p className="text-xs text-slate-500">
                  {selectedWorkspace.plan}
                </p>

              </div>


              <ChevronDown className="h-4 w-4"/>

            </button>



            {workspaceOpen && (

              <div className="absolute top-16 w-80 rounded-3xl border bg-white p-4 shadow-xl">


                {workspaces.map((workspace)=>(

                  <button
                    key={workspace.id}
                    onClick={()=>{
                      setSelectedWorkspace(workspace);
                      setWorkspaceOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl p-3 hover:bg-slate-100"
                  >

                    <div className="flex items-center gap-3">

                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${workspace.color}`} />

                      <div>

                        <p className="font-semibold">
                          {workspace.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {workspace.plan}
                        </p>

                      </div>

                    </div>


                    {selectedWorkspace.id === workspace.id &&
                      <Check className="text-emerald-500"/>
                    }


                  </button>

                ))}


              </div>

            )}

          </div>





          <nav className="hidden xl:flex gap-2">

            {navigation.map(renderNavLink)}

          </nav>


        </div>






        <div className="flex items-center gap-3">


          <button
            onClick={toggleTheme}
            className="h-11 w-11 rounded-2xl border bg-white/60"
          >

            {darkMode ?
              <Sun/> :
              <Moon/>
            }

          </button>





          <div
            ref={notificationRef}
            className="relative"
          >

            <button
              onClick={()=>setNotificationOpen(!notificationOpen)}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/60"
            >

              <Bell/>


              {unreadCount > 0 && (

                <span className="absolute right-1 top-1 rounded-full bg-red-500 px-1 text-xs text-white">

                  {unreadCount}

                </span>

              )}


            </button>




            {notificationOpen && (

              <div className="absolute right-0 top-14 w-80 rounded-3xl border bg-white p-4 shadow-xl">


                <h3 className="mb-3 font-bold">
                  Notifications
                </h3>


                {notifications.map(item=>(

                  <div
                    key={item.id}
                    className="border-b py-3"
                  >

                    <p className="font-semibold">
                      {item.title}
                    </p>

                    <p className="text-sm text-slate-500">
                      {item.description}
                    </p>


                    <span className="text-xs text-slate-400">
                      {item.time}
                    </span>

                  </div>

                ))}


                <Link
                  href="/notifications"
                  className="mt-4 block rounded-xl bg-slate-900 py-2 text-center text-white"
                >

                  View all notifications

                </Link>


              </div>

            )}


          </div>







          <div
            ref={userRef}
            className="relative"
          >

            <button
              onClick={()=>setUserOpen(!userOpen)}
              className="flex items-center gap-3 rounded-2xl border bg-white/60 p-2"
            >


              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">

                {initials}

              </div>


              <div className="hidden lg:block">

                <p className="text-sm font-semibold">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-slate-500">
                  {user?.email || ""}
                </p>


              </div>


            </button>





            {userOpen && (

              <div className="absolute right-0 top-16 w-72 rounded-3xl border bg-white p-4 shadow-xl">


                <Link
                  href="/profile"
                  className="flex gap-3 rounded-xl p-3 hover:bg-slate-100"
                >

                  <User/>
                  Profile

                </Link>


                <Link
                  href="/settings"
                  className="flex gap-3 rounded-xl p-3 hover:bg-slate-100"
                >

                  <Settings/>
                  Settings

                </Link>


                <button
                  onClick={handleLogout}
                  className="flex w-full gap-3 rounded-xl p-3 text-red-600 hover:bg-red-50"
                >

                  <LogOut/>
                  Logout

                </button>


              </div>

            )}


          </div>


        </div>


      </div>

    </header>
  );

}
