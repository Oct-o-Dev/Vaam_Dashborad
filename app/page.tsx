"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MapPin, Timer } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Ride {
  id: number;
  driver_id: string; // Assuming you changed to text
  pickup: string;
  destination: string;
  earning: number;
  rideTime: number;
}

export default function Home() {
  const { user, isLoaded } = useUser();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      console.log("User ID:", user.id); // Debug: Log the user ID
      const fetchRides = async () => {
        try {
          const { data, error } = await supabase
            .from("Vaam-Dashboard")
            .select("id, driver_id, pickup, destination, earning, rideTime")
            .eq("driver_id", user.id)
            .order("id", { ascending: false })
            .limit(3);

          console.log("Data:", data, "Error:", error); // Debug: Log the response
          if (error) {
            console.error("Error fetching rides:", error);
            throw error;
          }
          setRides(data || []);
          console.log("Rides set to:", data); // Debug: Log after setting state
        } catch (error) {
          console.error("Error fetching rides:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRides();
    }
  }, [isLoaded, user]);

  if (!isLoaded || loading) return <p>Loading...</p>;

  return (
    <main className="p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {user?.fullName} 👋

          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your recent activity
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-black text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              <Car className="h-4 w-4 text-[#ffd342]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$245.00</div>
              <p className="text-xs text-zinc-400">+5% from yesterday</p>
            </CardContent>
          </Card>
          <Card className="bg-black text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <Timer className="h-4 w-4 text-[#ffd342]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-zinc-400">Completed today</p>
            </CardContent>
          </Card>
          <Card className="bg-black text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Hours</CardTitle>
              <MapPin className="h-4 w-4 text-[#ffd342]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5h</div>
              <p className="text-xs text-zinc-400">Today's active time</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Rides</CardTitle>
          </CardHeader>
          <CardContent>
            
            <div className="space-y-4">
              {rides.length === 0 ? (
                <p>No recent rides found.</p>
              ) : (
                rides.map((ride) => (
                  <div
                    key={ride.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Ride #{ride.id}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{ride.pickup}</span>
                        <span className="mx-2">→</span>
                        <span>{ride.destination}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${ride.earning.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{ride.rideTime} mins</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}