"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/shared/router/navigation";
import { useAppSelector } from "@/shared/api/lib/hooks";
import { LoginForm, RegisterForm } from "@/features/auth";
import { cn } from "@/shared/api/lib/utils";

export default function AuthPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const [view, setView] = useState<"login" | "register">("login");

  useEffect(() => {

    if (user) {
      router.replace("/profile");
    }
  }, [user, router]);

  if (user) return null;

  return (
    <div className="container max-w-md py-20 mx-auto min-h-[600px] flex flex-col justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2">
            {view === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-500 text-sm">
            {view === "login" 
              ? "Enter your credentials to access your account" 
              : "Fill in the details to get started with us"}
          </p>
        </div>

        <div className="flex p-1 bg-gray-100 rounded-lg mb-8">
          <button
            onClick={() => setView("login")}
            className={cn(
              "flex-1 py-2 text-sm font-semibold rounded-md transition-all",
              view === "login" 
                ? "bg-white text-black shadow-sm" 
                : "text-gray-500 hover:text-black"
            )}
          >
            Log In
          </button>
          <button
            onClick={() => setView("register")}
            className={cn(
              "flex-1 py-2 text-sm font-semibold rounded-md transition-all",
              view === "register" 
                ? "bg-white text-black shadow-sm" 
                : "text-gray-500 hover:text-black"
            )}
          >
            Sign Up
          </button>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          {view === "login" ? <LoginForm /> : <RegisterForm />}
        </div>

      </div>
    </div>
  );
}