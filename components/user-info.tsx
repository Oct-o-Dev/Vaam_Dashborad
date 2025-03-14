"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { ModeToggle } from "./global/ModeToggle";
import { useUser } from "@supabase/auth-helpers-react";

export function UserInfo() {
  const user = useUser();

  // If user data is still loading, show a loading message
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-none bg-black text-white">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
            <AvatarFallback>
              {user.email ? user.email[0].toUpperCase() : "DU"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">
              {user.email ? user.email.split("@")[0] : "Driver"}
            </h2>
            <p className="text-zinc-400">Premium Driver</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-[#ffd342]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Total Earnings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2,458.00</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>

      <div className="hidden md:block">
        <ModeToggle />
      </div>
    </div>
  );
}