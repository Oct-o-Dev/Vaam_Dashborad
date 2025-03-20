"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignUp() {
	const router = useRouter();

	// Form State
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [selectedBrand, setSelectedBrand] = useState("");
	const [selectedModel, setSelectedModel] = useState("");
	const [carNumber, setCarNumber] = useState("");
	const [driversLicenseNumber, setDriversLicenseNumber] = useState("");
	const [InsuranceFile, setInsuranceFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	// Password Visibility
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

	// Predefined Car Brands & Models
	const carBrands: Record<string, string[]> = {
		Toyota: ["Corolla", "Camry", "RAV4"],
		Ford: ["Focus", "Mustang", "Explorer"],
		Honda: ["Civic", "Accord", "CR-V"],
		BMW: ["X5", "M3", "320i"],
		Mercedes: ["C-Class", "E-Class", "GLA"],
	};

	const handleSignUp = async () => {
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		setLoading(true);

		try {
			// Sign up the user
			const {
				data: { user },
				error,
			} = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						first_name: firstName,
						middle_name: middleName,
						last_name: lastName,
						phone_number: phoneNumber,
						drivers_license_number: driversLicenseNumber,
					},
				},
			});

			if (error) throw error;

			let insuranceUrl = "";

			// If the user uploaded an insurance file, upload it to Supabase Storage
			if (InsuranceFile) {
				const filePath = `insurance/${user?.id}/${InsuranceFile.name}`;
				const { data: uploadData, error: uploadError } = await supabase.storage
					.from("insurance") // 👈 Use the correct bucket name
					.upload(filePath, InsuranceFile, { upsert: true });

				if (uploadError) {
					console.error("Error uploading file:", uploadError.message);
					alert("Failed to upload insurance file: " + uploadError.message);
				} else {
					const { data: publicUrlData } = supabase.storage
						.from("insurance")
						.getPublicUrl(filePath);
					insuranceUrl = publicUrlData.publicUrl;
					console.log(insuranceUrl);
				}
			}

			// Insert user data into profiles table
			if (user) {
				const { error: profileError } = await supabase.from("profiles").insert([
					{
						id: user.id,
						first_name: firstName,
						middle_name: middleName,
						last_name: lastName,
						phone_number: phoneNumber,
						address: address,
						car_brand: selectedBrand,
						car_model: selectedModel,
						car_registration_number:carNumber,
						drivers_license_number: driversLicenseNumber,
						insurance_file_url: insuranceUrl,
					},
				]);

				if (profileError) {
					console.error("Profile insert error:", profileError.message);
					alert("Failed to create profile: " + profileError.message);
					return;
				}

				alert("Check your email for confirmation!");
			}
		} catch (error) {
			console.error("Sign-up failed:", error);
			alert(
				"Sign-up failed: " +
					(error instanceof Error ? error.message : "Unknown error")
			);
		} finally {
			setLoading(false);
		}
	};


	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
				<h1 className="text-2xl font-bold mb-6 text-center">Driver Sign Up</h1>
				<div className="space-y-4">
					<div className="flex space-x-2">
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First Name"
							className="w-1/3 px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
						/>
						<input
							type="text"
							value={middleName}
							onChange={(e) => setMiddleName(e.target.value)}
							placeholder="Middle Name"
							className="w-1/3 px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
						/>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last Name"
							className="w-1/3 px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
						/>
					</div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
					/>
					{/* Password Fields with Toggle */}
					{["password", "confirmPassword"].map((field, idx) => (
						<div key={field} className="relative">
							<input
								type={
									idx === 0
										? passwordVisible
											? "text"
											: "password"
										: confirmPasswordVisible
										? "text"
										: "password"
								}
								value={idx === 0 ? password : confirmPassword}
								onChange={(e) =>
									idx === 0
										? setPassword(e.target.value)
										: setConfirmPassword(e.target.value)
								}
								placeholder={idx === 0 ? "Password" : "Confirm Password"}
								className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
							/>
							<button
								type="button"
								onClick={() =>
									idx === 0
										? setPasswordVisible(!passwordVisible)
										: setConfirmPasswordVisible(!confirmPasswordVisible)
								}
								className="absolute right-3 top-3 text-gray-600"
							>
								{idx === 0
									? passwordVisible
										? "👁️"
										: "🔒"
									: confirmPasswordVisible
									? "👁️"
									: "🔒"}
							</button>
						</div>
					))}
					<input
						type="text"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						placeholder="Phone Number"
						className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
					/>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Address"
						className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
					/>
					{/* Car Brand Selection */}
					<select
						value={selectedBrand}
						onChange={(e) => setSelectedBrand(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
					>
						<option value="">Select Car Brand</option>
						{Object.keys(carBrands).map((brand) => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>
					{/* Car Model Selection */}
					<select
						value={selectedModel}
						onChange={(e) => setSelectedModel(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
						disabled={!selectedBrand}
					>
						<option value="">Select Model</option>
						{selectedBrand &&
							carBrands[selectedBrand].map((model) => (
								<option key={model} value={model}>
									{model}
								</option>
							))}
					</select>
					<input
						type="text"
						value={carNumber}
						onChange={(e) => setCarNumber(e.target.value)}
						placeholder="Driver's License Number"
						className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
					/>
					<input
						type="text"
						value={driversLicenseNumber}
						onChange={(e) => setDriversLicenseNumber(e.target.value)}
						placeholder="Driver's License Number"
						className="w-full px-4 py-2 border rounded-lg bg-white text-black focus:ring-blue-500"
					/>
					<input
						type="file"
						onChange={(e) => setInsuranceFile(e.target.files?.[0] || null)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						onClick={handleSignUp}
						disabled={loading}
						className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-blue-300"
					>
						{loading ? "Signing Up..." : "Sign Up"}
					</button>
				</div>
			</div>
		</div>
	);
}
