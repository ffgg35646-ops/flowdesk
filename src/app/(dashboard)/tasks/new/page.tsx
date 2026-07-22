"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTaskPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSave() {
    const tasks = JSON.parse(
      localStorage.getItem("tasks") || "[]"
    );

    const newTask = {
      id: Date.now(),
      ...form,
    };

    tasks.push(newTask);

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

    alert("Task created successfully");

    router.push("/tasks");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-8 py-10 text-white">

      <div className="mx-auto max-w-3xl rounded-3xl bg-slate-900 p-8">

        <h1 className="mb-8 text-3xl font-bold">
          Create Task
        </h1>


        <div className="space-y-5">


          <input
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />


          <textarea
            name="description"
            placeholder="Task description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />


          <div className="grid grid-cols-2 gap-4">

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="rounded-xl bg-slate-800 p-4 outline-none"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>


            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="rounded-xl bg-slate-800 p-4 outline-none"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>


          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none"
          />


          <div className="flex gap-4 pt-6">


            <button
              onClick={handleSave}
              className="rounded-xl bg-violet-600 px-8 py-3 font-semibold hover:bg-violet-700"
            >
              Save Task
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
