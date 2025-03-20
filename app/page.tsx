"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MapPin, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase'; // Import the initialized Supabase client

interface Ride {
  id: number;
  driver_id: string;
  pickup: string;
  destination: string;
  earning: number;
  rideTime: number;
}

interface UserProfile {
  id: string;
  display_name: string;
}

export default function Home() {
  const router = useRouter();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<any>(null);

  // Fetch authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser(); // Use the imported `supabase` client
      if (error) {
        console.error("Error fetching user:", error);
        router.push("/signin");
        return;
      }
      setUser(user);
    };
    fetchUser();
  }, [supabase, router]);

  // Fetch user profile and rides
  useEffect(() => {
    const fetchUserDataAndRides = async () => {
      if (!user) return;

      try {
        console.log("Authenticated User:", user); // Log authenticated user info

        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
        } else if (profileData) {
          setUserName(profileData.first_name);
        }

        // Fetch rides
        const { data: ridesData, error: ridesError } = await supabase
          .from("Vaam-Dashboard")
          .select("id, driver_id, pickup, destination, earning, rideTime")
          .eq("driver_id", user.id)
          .order("id", { ascending: false })
          .limit(3);

        if (ridesError) {
          console.error("Error fetching rides:", ridesError);
        } else {
          setRides(ridesData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndRides();
  }, [user, supabase]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect if no user
  if (!user) return null;

  return (
    <main className="p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back, {userName || user.email?.split('@')[0] || "Driver"} 👋
          </h2>
          <p className="text-muted-foreground">
            Here's an overview of your recent activity
          </p>
          <button
            onClick={handleSignOut}
            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
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