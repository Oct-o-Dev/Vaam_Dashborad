"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export function UserInfo() {
  return (
    <div className="space-y-4">
      <Card className="border-none shadow-none bg-black text-white">
        <CardContent className="flex items-center space-x-4 pt-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60" />
            <AvatarFallback>DU</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">Dummy K.</h2>
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
    </div>
  )
}