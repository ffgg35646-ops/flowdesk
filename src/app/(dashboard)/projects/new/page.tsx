"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Planning",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    const projects = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );

    projects.push({
      id: Date.now(),
      ...form,
      progress: 0,
    });

    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    );

    alert("Project created successfully");

    router.push("/projects");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <div className="mx-auto max-w-3xl rounded-3xl bg-slate-900 p-8">

        <h1 className="mb-8 text-3xl font-bold">
          Create Project
        </h1>

        <div className="space-y-5">

          <input
            name="name"
            placeholder="Project Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <div className="grid grid-cols-2 gap-4">

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="rounded-xl bg-slate-800 p-4 outline-none"
            />

            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="rounded-xl bg-slate-800 p-4 outline-none"
            />

          </div>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          >
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <div className="flex gap-4 pt-6">

            <button
              onClick={handleSave}
              className="rounded-xl bg-violet-600 px-8 py-3 font-semibold hover:bg-violet-700"
            >
              Save Project
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
