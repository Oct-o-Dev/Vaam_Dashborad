"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MapPin, Timer } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Ride {
	id: number;
	driver_id: string;
	pickup: string;
	destination: string;
	earning: number;
	rideTime: number;
	date: string;
	time: string;
}

interface UserProfile {
	id: string;
	display_name: string;
}

export default function Home() {
	const router = useRouter();
	// const [rides, setRides] = useState<Ride[]>([]);
	const [loading, setLoading] = useState(true);
	const [userName, setUserName] = useState<string>("");
	const [user, setUser] = useState<any>(null);

	// Fetch authenticated user
	useEffect(() => {
		const fetchUser = async () => {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();
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
				console.log("Authenticated User:", user);

				// Fetch user profile data
				const { data: profileData, error: profileError } = await supabase
					.from("profiles")
					.select("display_name")
					.eq("id", user.id)
					.single();

				if (profileError) {
					console.error("Error fetching profile:", profileError);
				} else if (profileData) {
					setUserName(profileData.display_name);
				}

				// Fetch rides
				const { data: ridesData, error: ridesError } = await supabase
					.from("Vaam-Dashboard")
					.select(
						"id, driver_id, pickup, destination, earning, rideTime, date, time"
					)
					.eq("driver_id", user.id)
					.order("id", { ascending: false })
					.limit(3);

				if (ridesError) {
					console.error("Error fetching rides:", ridesError);
				} else {
					// setRides(ridesData || []);
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
			<div className="flex items-center justify-center min-h-screen ">
				<div className="text-lg text-gray-700 dark:text-gray-300">
					Loading...
				</div>
			</div>
		);
	}

	// Redirect if no user
	if (!user) return null;

	const rides = [
		{
			id: 1,
			date: "12/DEC/2024",
			time: "12:00 AM",
			pickup: "Serica Court",
			destination: "Soho Square",
			earning: 13,
		},
		{
			id: 2,
			date: "12/DEC/2024",
			time: "12:00 AM",
			pickup: "Serica Court",
			destination: "Soho Square",
			earning: 13,
		},
		{
			id: 3,
			date: "12/DEC/2024",
			time: "12:00 AM",
			pickup: "Serica Court",
			destination: "Soho Square",
			earning: 13,
		},
	];

	return (
		<main className="min-h-screen  p-6 md:p-8">
			<div className="max-w-7xl mx-auto space-y-8">
				{/* Header Section */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white">
							Welcome back, {userName || user.email?.split("@")[0] || "Driver"}{" "}
							👋
						</h2>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Here's an overview of your recent activity
						</p>
					</div>
					<button
						onClick={handleSignOut}
						className="bg-[#ffd342] text-black font-medium py-2 px-6 rounded-full hover:bg-[#e6be2e] transition-colors shadow-md"
					>
						Sign Out
					</button>
				</div>

				{/* Stats Cards */}
				<div className="grid gap-6 md:grid-cols-3">
					<Card className="bg-white dark:bg-black border border-gray-200 dark:border-[#ffd342]/50 shadow-lg hover:shadow-xl transition-shadow">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Today's Earnings
							</CardTitle>
							<Car className="h-5 w-5 text-[#ffd342]" />
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-black dark:text-white">
								$245.00
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
								+5% from yesterday
							</p>
						</CardContent>
					</Card>
					<Card className="bg-white dark:bg-black border border-gray-200 dark:border-[#ffd342]/50 shadow-lg hover:shadow-xl transition-shadow">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Total Rides
							</CardTitle>
							<Timer className="h-5 w-5 text-[#ffd342]" />
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-black dark:text-white">
								12
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
								Completed today
							</p>
						</CardContent>
					</Card>
					<Card className="bg-white dark:bg-black border border-gray-200 dark:border-[#ffd342]/50 shadow-lg hover:shadow-xl transition-shadow">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Online Hours
							</CardTitle>
							<MapPin className="h-5 w-5 text-[#ffd342]" />
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold text-black dark:text-white">
								8.5h
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
								Today's active time
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Recent Rides */}

				<Card className="bg-white dark:bg-black border  rounded-xl shadow-lg">
					<CardHeader>
						<CardTitle className=" flex justify-center text-2xl font-semibold text-black dark:text-white">
							Recent Rides
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-6">
							{rides.length === 0 ? (
								<p className="text-gray-600 dark:text-gray-400">
									No recent rides found.
								</p>
							) : (
								rides.map((ride, index) => (
									<div
										key={ride.id}
										className={`p-5 bg-white dark:bg-black rounded-lg border   shadow-lg hover:shadow-lg transition-shadow ${
											index !== rides.length - 1
												? "border-b-0 dark:border-b-0"
												: ""
										}`}
									>
										{/* Top Row: Date and Price */}
										<div className="flex justify-between items-center mb-4">
											<p className="text-sm text-gray-500 dark:text-gray-400">
												{ride.date} • {ride.time}
											</p>
											<p className="text-lg font-bold text-[#ffd342]">
												£{ride.earning.toFixed(2)}
											</p>
										</div>

										{/* Middle Row: Pickup, Arrow, and Destination */}
										<div className="space-y-2">
											<div className="flex items-center text-sm">
												<span className="w-3 h-3 bg-[#ffd342] rounded-full mr-2"></span>
												<span className="text-black dark:text-white">
													{ride.pickup}
												</span>
											</div>
											<div className="flex items-center justify-start">
												<span className="text-gray-500 dark:text-gray-400 mx-5">
													↓
												</span>
											</div>
											<div className="flex items-center text-sm">
												<span className="w-3 h-3 bg-[#ffd342] rounded-full mr-2"></span>
												<span className="text-black dark:text-white">
													{ride.destination}
												</span>
											</div>
										</div>

										{/* Bottom Row: See Detail Button */}
										<div className="flex justify-end mt-4">
											<Link href={`/ride-details/${ride.id}`}>
												<button className="bg-[#ffd342] text-black text-sm font-medium py-2 px-4 rounded-full hover:bg-[#e6be2e] transition-colors shadow-sm">
													See Detail
												</button>
											</Link>
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
