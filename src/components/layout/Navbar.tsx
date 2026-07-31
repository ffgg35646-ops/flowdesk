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
    color: "from-purple-500 to-purple-950",
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
            ? "bg-purple-900 text-white dark:bg-purple-950 dark:text-purple-100"
            : "text-purple-950 hover:bg-purple-100 dark:text-purple-200 dark:hover:bg-purple-900/50"
          }
        `}
      >

        {item.label}

      </Link>

    );

  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200/50 bg-white/70 backdrop-blur-2xl dark:border-purple-900/50 dark:bg-purple-950/70">

      <div className="relative mx-auto flex h-20 w-full max-w-[1700px] items-center justify-between px-4 lg:px-8">


        <div className="flex items-center gap-3">


          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-200 bg-white/60 text-purple-950 dark:border-purple-900 dark:bg-purple-950/60 dark:text-purple-100 lg:hidden"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>



          <Link
            href="/dashboard"
            className="flex items-center gap-3"
          >

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-950 text-white">

              <Briefcase />

            </div>


            <div className="hidden lg:block">

              <h2 className="font-bold text-purple-950 dark:text-white">
                FlowDesk
              </h2>

              <p className="text-xs text-purple-700 dark:text-purple-300">
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
              className="ml-5 flex items-center gap-3 rounded-2xl border border-purple-200 bg-white/60 px-4 py-2.5 text-purple-950 dark:border-purple-900 dark:bg-purple-950/60 dark:text-purple-100"
            >

              <Building2 className="h-5 w-5 text-purple-700 dark:text-purple-300"/>


              <div className="text-left">

                <p className="text-sm font-semibold">
                  {selectedWorkspace.name}
                </p>

                <p className="text-xs text-purple-700 dark:text-purple-300">
                  {selectedWorkspace.plan}
                </p>

              </div>


              <ChevronDown className="h-4 w-4 text-purple-700 dark:text-purple-300"/>

            </button>



            {workspaceOpen && (

              <div className="absolute top-16 w-80 rounded-3xl border border-purple-200 bg-white p-4 shadow-xl dark:border-purple-900 dark:bg-purple-950">


                {workspaces.map((workspace)=>(

                  <button
                    key={workspace.id}
                    onClick={()=>{
                      setSelectedWorkspace(workspace);
                      setWorkspaceOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl p-3 text-purple-950 hover:bg-purple-50 dark:text-purple-100 dark:hover:bg-purple-900/50"
                  >

                    <div className="flex items-center gap-3">

                      <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${workspace.color}`} />

                      <div className="text-left">

                        <p className="font-semibold">
                          {workspace.name}
                        </p>

                        <p className="text-xs text-purple-700 dark:text-purple-300">
                          {workspace.plan}
                        </p>

                      </div>

                    </div>


                    {selectedWorkspace.id === workspace.id &&
                      <Check className="text-purple-700 dark:text-purple-300"/>
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
            className="flex items-center justify-center h-11 w-11 rounded-2xl border border-purple-200 bg-white/60 text-purple-950 dark:border-purple-900 dark:bg-purple-950/60 dark:text-purple-100"
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
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-200 bg-white/60 text-purple-950 dark:border-purple-900 dark:bg-purple-950/60 dark:text-purple-100"
            >

              <Bell/>


              {unreadCount > 0 && (

                <span className="absolute right-1 top-1 rounded-full bg-purple-900 px-1 text-xs text-white">

                  {unreadCount}

                </span>

              )}


            </button>




            {notificationOpen && (

              <div className="absolute right-0 top-14 w-80 rounded-3xl border border-purple-200 bg-white p-4 shadow-xl dark:border-purple-900 dark:bg-purple-950">


                <h3 className="mb-3 font-bold text-purple-950 dark:text-white">
                  Notifications
                </h3>


                {notifications.map(item=>(

                  <div
                    key={item.id}
                    className="border-b border-purple-100 dark:border-purple-900/50 py-3"
                  >

                    <p className="font-semibold text-purple-950 dark:text-purple-100">
                      {item.title}
                    </p>

                    <p className="text-sm text-purple-800 dark:text-purple-300">
                      {item.description}
                    </p>


                    <span className="text-xs text-purple-600 dark:text-purple-400">
                      {item.time}
                    </span>

                  </div>

                ))}


                <Link
                  href="/notifications"
                  className="mt-4 block rounded-xl bg-purple-950 py-2 text-center text-white hover:bg-purple-900 dark:bg-purple-900 dark:hover:bg-purple-800"
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
              className="flex items-center gap-3 rounded-2xl border border-purple-200 bg-white/60 p-2 text-purple-950 dark:border-purple-900 dark:bg-purple-950/60 dark:text-purple-100"
            >


              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-950 text-white">

                {initials}

              </div>


              <div className="hidden lg:block text-left">

                <p className="text-sm font-semibold">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-purple-700 dark:text-purple-300">
                  {user?.email || ""}
                </p>


              </div>


            </button>





            {userOpen && (

              <div className="absolute right-0 top-16 w-72 rounded-3xl border border-purple-200 bg-white p-4 shadow-xl dark:border-purple-900 dark:bg-purple-950">


                <Link
                  href="/profile"
                  className="flex gap-3 rounded-xl p-3 text-purple-950 hover:bg-purple-50 dark:text-purple-100 dark:hover:bg-purple-900/50"
                >

                  <User/>
                  Profile

                </Link>


                <Link
                  href="/settings"
                  className="flex gap-3 rounded-xl p-3 text-purple-950 hover:bg-purple-50 dark:text-purple-100 dark:hover:bg-purple-900/50"
                >

                  <Settings/>
                  Settings

                </Link>


                <button
                  onClick={handleLogout}
                  className="flex w-full gap-3 rounded-xl p-3 text-purple-950 hover:bg-purple-100 dark:text-purple-200 dark:hover:bg-purple-900/80 font-medium"
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
