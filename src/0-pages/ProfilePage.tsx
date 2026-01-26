"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/api/lib/hooks";
import { logout } from "@/features/auth/model/authSlice";
import { Button } from "@/shared/ui/Buttons/button";
import { Loader2, LogOut, Mail, User as UserIcon } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isPending } = useAppSelector((state) => state.auth);

   useEffect(() => {
    if (!user && !isPending) {
      router.replace("/auth");
    }
  }, [user, isPending, router]);

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace("/");
    router.refresh();
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const fullName = user.user_metadata?.full_name || "User";
  const email = user.email;

  return (
    <div className="container max-w-2xl py-20 mx-auto">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white rounded-2xl p-8 border shadow-sm space-y-6">
        
        <div className="flex items-center gap-4 border-b pb-6">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {fullName[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">{fullName}</h2>
            <p className="text-gray-500 text-sm">Customer Account</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <UserIcon className="w-5 h-5 text-gray-400" />
            <div className="flex-col flex">
              <span className="text-xs text-gray-500">Full Name</span>
              <span className="font-medium">{fullName}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-col flex">
              <span className="text-xs text-gray-500">Email Address</span>
              <span className="font-medium">{email}</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            variant="destructive" 
            className="w-full sm:w-auto gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>

      </div>
    </div>
  );
}