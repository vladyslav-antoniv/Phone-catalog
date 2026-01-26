"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/shared/api/lib/hooks";
import { register as registerThunk } from "../model/authSlice";
import {registerSchema, RegisterValues} from "../model/schema";

import { Button } from "@/shared/ui/Buttons/button";
import { Input } from "@/shared/ui/input";

export function RegisterForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isPending, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterValues) => {
    const result = await dispatch(registerThunk({ 
      email: data.email, 
      password: data.password, 
      name: data.name 
    }));

    if (registerThunk.fulfilled.match(result)) {
      router.push("/profile");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      {error && <div className="">{error}</div>}

    <div className="space-y-1">
        <Input
          {...register("name")}
          placeholder="Full Name"
          className={errors.name ? "border-red-500" : ""}
          disabled={isPending}
        />
        {errors.name && (
          <span className="text-xs text-red-500 ml-1">{errors.name.message}</span>
        )}
      </div>

      <div className="my-5">
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          className={errors.email ? "border-red-500" : ""}
          disabled={isPending}
        />
        {errors.email && (
          <span className="text-xs text-red-500 ml-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="my-5">
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          className={errors.password ? "border-red-500" : ""}
          disabled={isPending}
        />
        {errors.password && (
          <span className="text-xs text-red-500 ml-1">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
          </>
        ) : (
          "Log In"
        )}
      </Button>
    </form>
  );
}
