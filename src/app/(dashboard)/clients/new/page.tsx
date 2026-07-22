"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    const clients = JSON.parse(
      localStorage.getItem("clients") || "[]"
    );

    clients.push({
      id: Date.now(),
      ...form,
    });

    localStorage.setItem(
      "clients",
      JSON.stringify(clients)
    );

    router.push("/clients");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-8 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-slate-900 p-8">

        <h1 className="mb-8 text-3xl font-bold">
          Add Client
        </h1>

        <div className="space-y-5">

          <input
            name="name"
            placeholder="Client Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <div className="flex gap-4 pt-6">

            <button
              onClick={handleSave}
              className="rounded-xl bg-violet-600 px-8 py-3 font-semibold hover:bg-violet-700"
            >
              Save Client
            </button>

            <button
              onClick={() => router.back()}
              className="rounded-xl bg-slate-700 px-8 py-3"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}
