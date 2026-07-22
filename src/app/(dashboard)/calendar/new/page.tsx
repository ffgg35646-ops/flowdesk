"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    const events = JSON.parse(
      localStorage.getItem("events") || "[]"
    );

    events.push({
      id: Date.now(),
      ...form,
    });

    localStorage.setItem(
      "events",
      JSON.stringify(events)
    );

    router.push("/calendar");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <div className="mx-auto max-w-3xl rounded-3xl bg-slate-900 p-8">

        <h1 className="mb-8 text-3xl font-bold">
          Create Event
        </h1>

        <div className="space-y-5">

          <input
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <textarea
            rows={5}
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />

          <div className="flex gap-4 pt-6">

            <button
              onClick={handleSave}
              className="rounded-xl bg-violet-600 px-8 py-3 font-semibold hover:bg-violet-700"
            >
              Save Event
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
