"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@supabase/auth-helpers-react";

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
	const [UpdatedInsuranceFile, setUpdatedInsuranceFile] = useState<File | null>(
		null
	);
	const user = useUser();

	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(false);

	// Car brands and models
	const carBrands: Record<string, string[]> = {
		Toyota: ["Corolla", "Camry", "RAV4"],
		Ford: ["Focus", "Mustang", "Explorer"],
		Honda: ["Civic", "Accord", "CR-V"],
		BMW: ["X5", "M3", "320i"],
		Mercedes: ["C-Class", "E-Class", "GLA"],
	};

	// Fetch profile data when the component mounts
	useEffect(() => {
		const fetchProfile = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				const { data, error } = await supabase
					.from("profiles")
					.select(
						"first_name, middle_name, last_name, phone_number, address, car_brand, car_model, drivers_license_number, insurance_file_url"
					)
					.eq("id", user.id)
					.single();

				if (error) {
					console.error("Error fetching profile:", error.message);
				} else {
					setProfile(data);
				}
			}
			setLoading(false);
		};

		fetchProfile();
	}, []);


	// Handle form input changes
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setProfile((prevProfile) => ({
			...prevProfile,
			[id]: value,
		}));
	};

	// Handle file input
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			setProfile((prevProfile) => ({
				...prevProfile,
				insurance_file: UpdatedInsuranceFile,
			}));
		}
	};

	// Save profile
	const handleSave = async () => {
		setLoading(true);
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (user) {
			let insuranceUrl = profile.insurance_file_url; // Keep the existing URL

			// Upload the new insurance file if selected
			if (UpdatedInsuranceFile) {
				const file = UpdatedInsuranceFile;
				const fileExt = file.name.split(".").pop();
				const filePath = `insurance/${user.id}.${UpdatedInsuranceFile.name}`; // Unique filename

				const { data, error } = await supabase.storage
					.from("insurance")
					.upload(filePath, file, { upsert: true });

				if (error) {
					console.error("File upload failed:", error.message);
					alert("File upload failed: " + error.message);
				} else {
					const { data: publicUrlData } = supabase.storage
						.from("insurance")
						.getPublicUrl(filePath);
					insuranceUrl = publicUrlData.publicUrl;
				}
			}

			// Update profile in database
			const { error } = await supabase
				.from("profiles")
				.update({
					first_name: profile.first_name,
					middle_name: profile.middle_name,
					last_name: profile.last_name,
					phone_number: profile.phone_number,
					address: profile.address,
					car_brand: profile.car_brand,
					car_model: profile.car_model,
					drivers_license_number: profile.drivers_license_number,
					insurance_file_url: insuranceUrl,
				})
				.eq("id", user.id);

			if (error) {
				console.error("Error updating profile:", error.message);
				alert("Failed to update profile: " + error.message);
			} else {
				alert("Profile updated successfully!");
				setEditing(false);
			}
		}
		setLoading(false);
	};


	if (loading || !user) return <div>Loading...</div>;

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
					{editing ? (
						<div className="grid gap-3">
							<Label htmlFor="first_name">First Name</Label>
							<Input
								id="first_name"
								value={profile.first_name}
								onChange={handleInputChange}
							/>
							<Label htmlFor="middle_name">Middle Name</Label>
							<Input
								id="middle_name"
								value={profile.middle_name}
								onChange={handleInputChange}
							/>
							<Label htmlFor="last_name">Last Name</Label>
							<Input
								id="last_name"
								value={profile.last_name}
								onChange={handleInputChange}
							/>
							<Label htmlFor="phone_number">Phone Number</Label>
							<Input
								id="phone_number"
								value={profile.phone_number}
								onChange={handleInputChange}
							/>
							<Label htmlFor="address">Address</Label>
							<Input
								id="address"
								value={profile.address}
								onChange={handleInputChange}
							/>
							<Label htmlFor="car_brand">Car Brand</Label>
							<select
								id="car_brand"
								value={profile.car_brand}
								onChange={handleInputChange}
								className="border p-2 rounded"
							>
								<option value="">Select Car Brand</option>
								{Object.keys(carBrands).map((brand) => (
									<option key={brand} value={brand}>
										{brand}
									</option>
								))}
							</select>
							<Label htmlFor="car_model">Car Model</Label>
							<select
								id="car_model"
								value={profile.car_model}
								onChange={handleInputChange}
								className="border p-2 rounded"
								disabled={!profile.car_brand}
							>
								<option value="">Select Model</option>
								{profile.car_brand &&
									carBrands[profile.car_brand]?.map((model) => (
										<option key={model} value={model}>
											{model}
										</option>
									))}
							</select>
							<Label htmlFor="drivers_license_number">
								Driver's License Number
							</Label>
							<Input
								id="drivers_license_number"
								value={profile.drivers_license_number}
								onChange={handleInputChange}
							/>

							{/* Insurance file only in edit mode */}
							<Label htmlFor="insurance_file">Update Insurance File</Label>
							<Input
								id="insurance_file"
								type="file"
								onChange={(e) =>
									setUpdatedInsuranceFile(e.target.files?.[0] || null)
								}
							/>

							<div className="flex space-x-2 mt-4">
								<Button
									onClick={handleSave}
									className="bg-black text-white hover:bg-black/90"
								>
									Save Changes
								</Button>
								<Button
									onClick={() => setEditing(false)}
									className="bg-gray-500 text-white hover:bg-gray-600"
								>
									Cancel
								</Button>
							</div>
						</div>
					) : (
						<div className="space-y-2">
							<p>
								<strong>Name:</strong> {profile.first_name}{" "}
								{profile.middle_name} {profile.last_name}
							</p>
							<p>
								<strong>Email:</strong> {user.email}
							</p>
							<p>
								<strong>Phone:</strong> {profile.phone_number}
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
							{profile.insurance_file_url && (
								<p>
									<strong>Insurance File:</strong>{" "}
									<a
										href={profile.insurance_file_url}
										target="_blank"
										className="text-blue-500 underline"
									>
										View Insurance Document
									</a>
								</p>
							)}

							<Button
								onClick={() => setEditing(true)}
								className="bg-blue-500 text-white hover:bg-blue-600 mt-4"
							>
								Edit Profile
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
