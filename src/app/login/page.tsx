"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }


  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );


      const data = await res.json();


      if (!res.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }


      router.push("/dashboard");


    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }


  return (
    <main className="min-h-screen flex items-center justify-center bg-[#070b2a] px-4">


      <form
        onSubmit={handleSubmit}
        className="
        w-full max-w-md space-y-5
        rounded-2xl
        bg-[#211338]
        p-8
        shadow-2xl
        border border-purple-900/40
        "
      >


        <div className="text-center space-y-2">

          <div className="
          mx-auto flex h-14 w-14 items-center justify-center
          rounded-full bg-blue-600
          ">
            <LogIn className="text-white" />
          </div>


          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>


          <p className="text-sm text-gray-300">
            Login to your FlowDesk account
          </p>

        </div>



        {error && (
          <div className="
          rounded-lg
          bg-red-950
          p-3
          text-sm
          text-red-300
          ">
            {error}
          </div>
        )}




        <div className="relative">

          <Mail className="
          absolute left-3 top-3.5
          text-gray-400
          "
          size={20}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="
            w-full rounded-xl
            border border-purple-900
            bg-[#15102b]
            p-3 pl-10
            text-white
            placeholder-gray-400
            outline-none
            focus:border-blue-500
            "
          />

        </div>




        <div className="relative">

          <Lock className="
          absolute left-3 top-3.5
          text-gray-400
          "
          size={20}
          />


          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="
            w-full rounded-xl
            border border-purple-900
            bg-[#15102b]
            p-3 pl-10
            text-white
            placeholder-gray-400
            outline-none
            focus:border-blue-500
            "
          />

        </div>




        <button
          disabled={loading}
          className="
          w-full
          rounded-xl
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          p-3
          font-semibold
          text-white
          transition
          hover:opacity-90
          disabled:opacity-50
          "
        >

          {loading
            ? "Loading..."
            : "Login"
          }

        </button>


      </form>


    </main>
  );
}
