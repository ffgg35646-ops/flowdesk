"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Building2, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    companyName: "",
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
        "/api/auth/register",
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
          data.message || "Registration failed"
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
    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#070b2a]
      px-4
    ">


      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-md
          space-y-5
          rounded-2xl
          bg-[#211338]
          p-8
          shadow-2xl
          border
          border-purple-900/40
        "
      >


        <div className="text-center space-y-2">

          <div className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-purple-600
          ">
            <UserPlus className="text-white" />
          </div>


          <h1 className="
            text-3xl
            font-bold
            text-white
          ">
            Create Account
          </h1>


          <p className="text-sm text-gray-300">
            Join FlowDesk and manage your team
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

          <User
            className="
              absolute
              left-3
              top-3.5
              text-gray-400
            "
            size={20}
          />

          <input
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-purple-900
              bg-[#15102b]
              p-3
              pl-10
              text-white
              placeholder-gray-400
              outline-none
              focus:border-blue-500
            "
          />

        </div>




        <div className="relative">

          <Building2
            className="
              absolute
              left-3
              top-3.5
              text-gray-400
            "
            size={20}
          />

          <input
            name="companyName"
            placeholder="Company name"
            value={form.companyName}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-purple-900
              bg-[#15102b]
              p-3
              pl-10
              text-white
              placeholder-gray-400
              outline-none
              focus:border-blue-500
            "
          />

        </div>




        <div className="relative">

          <Mail
            className="
              absolute
              left-3
              top-3.5
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
              w-full
              rounded-xl
              border
              border-purple-900
              bg-[#15102b]
              p-3
              pl-10
              text-white
              placeholder-gray-400
              outline-none
              focus:border-blue-500
            "
          />

        </div>




        <div className="relative">

          <Lock
            className="
              absolute
              left-3
              top-3.5
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
              w-full
              rounded-xl
              border
              border-purple-900
              bg-[#15102b]
              p-3
              pl-10
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
            ? "Creating..."
            : "Register"
          }

        </button>


      </form>


    </main>
  );
}
