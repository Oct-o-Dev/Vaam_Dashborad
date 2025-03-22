"use client";

import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useSupabase } from "@/lib/supabase-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Profile {
	first_name: string;
	middle_name: string;
	last_name: string;
	phone_number: string;
	address: string;
	car_brand: string;
	car_model: string;
	drivers_license_number: string;
	insurance_file_url: string;
}

export default function AccountPage() {
	const session = useSession();
	const { supabase } = useSupabase();
	const [profile, setProfile] = useState<Profile>({
		first_name: "",
		middle_name: "",
		last_name: "",
		phone_number: "",
		address: "",
		car_brand: "",
		car_model: "",
		drivers_license_number: "",
		insurance_file_url: "",
	});
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		if (!session?.user) return;
		const fetchProfile = async () => {
			const { data, error } = await supabase
				.from("profiles")
				.select("*")
				.eq("id", session.user.id)
				.single();

			if (error) {
				console.error("Error fetching profile:", error.message);
			} else {
				setProfile(data);
			}
			setLoading(false);
		};

		fetchProfile();
	}, [session, supabase]);

	if (!session) return <div>Loading session...</div>;
	if (loading) return <div>Loading profile...</div>;

	return (
		<div className="space-y-8">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">My Account</h2>
				<p className="text-muted-foreground">
					Manage your personal information
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<p>
							<strong>Name:</strong> {profile.first_name} {profile.middle_name}{" "}
							{profile.last_name}
						</p>
						<p>
							<strong>Email:</strong> {session.user.email}
						</p>
						<p>
							<strong>Phone Number:</strong> {profile.phone_number}
						</p>
						<p>
							<strong>Address:</strong> {profile.address}
						</p>
						<p>
							<strong>Car:</strong> {profile.car_brand} {profile.car_model}
						</p>
						<p>
							<strong>Driver's License:</strong>{" "}
							{profile.drivers_license_number}
						</p>
						<p>
							<strong>Insurance File:</strong>{" "}
							<a
								href={profile.insurance_file_url}
								target="_blank"
								className="text-blue-500"
							>
								View File
							</a>
						</p>
						<Button
							onClick={() => setEditing(true)}
							className="bg-blue-500 text-white hover:bg-blue-600 mt-4"
						>
							Edit Profile
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
