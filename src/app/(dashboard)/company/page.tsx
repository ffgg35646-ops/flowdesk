// src/app/(dashboard)/company/page.tsx

"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  ShieldCheck,
  Save,
} from "lucide-react";

interface CompanyData {
  companyName: string;
  website: string;
  email: string;
  location: string;
  founded: string;
  employees: string;
  description: string;
}

export default function CompanyPage() {
  const [company, setCompany] = useState<CompanyData>({
    companyName: "",
    website: "",
    email: "",
    location: "",
    founded: "",
    employees: "",
    description: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("companyData");

    if (saved) {
      setCompany(JSON.parse(saved));
    }
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });
  }

  function saveCompany() {
    localStorage.setItem(
      "companyData",
      JSON.stringify(company)
    );

    alert("Company data saved.");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 dark:bg-slate-950 lg:px-8">
      <div className="mx-auto max-w-[1600px]">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Company
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Add your company information.
          </p>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/70 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">

          <div className="mb-8 flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
              <Building2 className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Company Information
              </h2>

              <p className="text-slate-500 dark:text-slate-400">
                Fill your organization data.
              </p>
            </div>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Input
              icon={Building2}
              label="Company Name"
              name="companyName"
              value={company.companyName}
              onChange={handleChange}
            />

            <Input
              icon={Globe}
              label="Website"
              name="website"
              value={company.website}
              onChange={handleChange}
            />

            <Input
              icon={Mail}
              label="Company Email"
              name="email"
              value={company.email}
              onChange={handleChange}
            />

            <Input
              icon={MapPin}
              label="Location"
              name="location"
              value={company.location}
              onChange={handleChange}
            />

            <Input
              icon={ShieldCheck}
              label="Founded"
              name="founded"
              value={company.founded}
              onChange={handleChange}
            />

            <Input
              icon={Building2}
              label="Employees"
              name="employees"
              value={company.employees}
              onChange={handleChange}
            />

          </div>

          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Company Description
            </label>

            <textarea
              name="description"
              rows={5}
              value={company.description}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white p-4 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />

          </div>

          <button
            onClick={saveCompany}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-3 font-semibold text-white transition hover:scale-[1.02] dark:bg-white dark:text-slate-900"
          >
            <Save className="h-5 w-5" />
            Save Company
          </button>

        </div>

      </div>
    </main>
  );
}

function Input({
  icon: Icon,
  label,
  name,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <div className="relative">

        <Icon className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />

        <input
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />

      </div>

    </div>
  );
}
