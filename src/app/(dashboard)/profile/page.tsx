// src/app/(dashboard)/profile/page.tsx

"use client";

import { useState } from "react";

import {
  User,
  Mail,
  Shield,
  Building2,
  Save,
  Camera,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  CalendarDays,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";


const defaultAvatar =
  "https://i.pravatar.cc/300?img=12";


export default function ProfilePage() {

  const { user } = useAuth();


  const [profile, setProfile] = useState({

    name: user?.name || "",

    email: user?.email || "",

    role: user?.role || "",

    company: user?.companyId || "",

    jobTitle: "",

    phone: "",

    country: "",

    city: "",

    website: "",

    bio: "",

    birthDate: "",

    avatar: defaultAvatar,

  });



  function updateField(
    field: string,
    value: string
  ) {

    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));

  }



  function changePhoto(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = e.target.files?.[0];


    if (!file) return;


    const reader = new FileReader();


    reader.onload = () => {

      updateField(
        "avatar",
        String(reader.result)
      );

    };


    reader.readAsDataURL(file);

  }



  function saveProfile() {

    localStorage.setItem(
      "flowdesk_profile",
      JSON.stringify(profile)
    );


    alert("Profile saved successfully");

  }



  return (

    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">

      <div className="mx-auto max-w-[1200px]">


        <div className="mb-8">

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Profile
          </h1>


          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your personal account information.
          </p>

        </div>
        <div className="rounded-3xl border border-white/20 bg-white/70 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">


          <div className="flex flex-col items-center gap-6 border-b border-slate-200 pb-8 dark:border-white/10 md:flex-row">


            <div className="relative">


              <img
                src={profile.avatar}
                alt="Profile"
                className="h-28 w-28 rounded-3xl object-cover"
              />


              <label className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg">


                <Camera className="h-5 w-5" />


                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={changePhoto}
                />


              </label>


            </div>



            <div>


              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                {profile.name || "Account Profile"}

              </h2>



              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">

                Update your personal details and account information.

              </p>



            </div>



          </div>





          <div className="mt-8 grid gap-6 md:grid-cols-2">



            <ProfileField
              icon={User}
              label="Full Name"
              value={profile.name}
              onChange={(v:string)=>updateField("name",v)}
            />



            <ProfileField
              icon={Mail}
              label="Email Address"
              value={profile.email}
              onChange={(v:string)=>updateField("email",v)}
            />



            <ProfileField
              icon={Shield}
              label="Role"
              value={profile.role}
              onChange={(v:string)=>updateField("role",v)}
            />



            <ProfileField
              icon={Building2}
              label="Company"
              value={profile.company}
              onChange={(v:string)=>updateField("company",v)}
            />



            <ProfileField
              icon={Briefcase}
              label="Job Title"
              value={profile.jobTitle}
              onChange={(v:string)=>updateField("jobTitle",v)}
            />



            <ProfileField
              icon={Phone}
              label="Phone Number"
              value={profile.phone}
              onChange={(v:string)=>updateField("phone",v)}
            />

            <ProfileField
              icon={MapPin}
              label="Country / City"
              value={`${profile.country}${profile.city ? " - " + profile.city : ""}`}
              onChange={(v:string)=>{

                const parts = v.split("-");

                updateField(
                  "country",
                  parts[0]?.trim() || ""
                );

                updateField(
                  "city",
                  parts[1]?.trim() || ""
                );

              }}
            />



            <ProfileField
              icon={Globe}
              label="Website"
              value={profile.website}
              onChange={(v:string)=>updateField("website",v)}
            />



            <ProfileField
              icon={CalendarDays}
              label="Birth Date"
              value={profile.birthDate}
              onChange={(v:string)=>updateField("birthDate",v)}
            />



          </div>





          <div className="mt-6">


            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

              Bio

            </label>



            <textarea

              value={profile.bio}

              onChange={(e)=>updateField(
                "bio",
                e.target.value
              )}

              placeholder="Write something about yourself..."

              rows={5}

              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                text-sm
                outline-none
                transition
                focus:border-violet-500
                dark:border-white/10
                dark:bg-white/5
                dark:text-white
              "

            />


          </div>






          <button

            onClick={saveProfile}

            className="
              mt-8
              flex
              items-center
              gap-2
              rounded-2xl
              bg-slate-900
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:scale-[1.02]
              dark:bg-white
              dark:text-slate-900
            "

          >


            <Save className="h-5 w-5" />


            Save Changes


          </button>




        </div>


      </div>


    </main>


  );

}




function ProfileField({

  icon: Icon,

  label,

  value,

  onChange,

}: {

  icon: React.ElementType;

  label: string;

  value: string;

  onChange: (value:string)=>void;

}) {


  return (

    <div>


      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">

        {label}

      </label>


      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5">


        <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400"/>


        <input

          value={value}

          onChange={(e)=>onChange(e.target.value)}

          className="
            w-full
            bg-transparent
            text-sm
            text-slate-900
            outline-none
            dark:text-white
          "

        />


      </div>


    </div>

  );

}

