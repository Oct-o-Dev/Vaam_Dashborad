// app/signup/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";

export default function SignUp() {
	const { supabase } = useSupabase();
	const router = useRouter();
	const [authMethod, setAuthMethod] = useState<"email" | "google">("email");
	const [formData, setFormData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		address: "",
		selectedBrand: "",
		selectedModel: "",
		carNumber: "",
		driversLicenseNumber: "",
	});
	const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const carBrands: Record<string, string[]> = {
		Toyota: ["Corolla", "Camry", "RAV4"],
		Ford: ["Focus", "Mustang", "Explorer"],
		Honda: ["Civic", "Accord", "CR-V"],
		BMW: ["X5", "M3", "320i"],
		Mercedes: ["C-Class", "E-Class", "GLA"],
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setInsuranceFile(e.target.files[0]);
		}
	};

	const validateForm = () => {
		const requiredFields = [
			"firstName",
			"lastName",
			"phoneNumber",
			"address",
			"selectedBrand",
			"selectedModel",
			"carNumber",
			"driversLicenseNumber",
		];
		if (authMethod === "email") {
			requiredFields.push("email", "password", "confirmPassword");
		}
		for (const field of requiredFields) {
			if (!formData[field as keyof typeof formData]) {
				alert(`Please fill out the ${field} field.`);
				return false;
			}
		}
		if (
			authMethod === "email" &&
			formData.password !== formData.confirmPassword
		) {
			alert("Passwords do not match.");
			return false;
		}
		return true;
	};

	const handleEmailSignUp = async () => {
		if (!validateForm()) return;
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
			});
			if (error) throw error;
			const user = data.user;
			if (!user) throw new Error("User not created");

			// Upload insurance file if provided
			let insuranceUrl = "";
			if (insuranceFile) {
				const filePath = `insurance/${user.id}/${insuranceFile.name}`;
				const { error: uploadError } = await supabase.storage
					.from("insurance")
					.upload(filePath, insuranceFile);
				if (uploadError) throw uploadError;
				const { data: urlData } = supabase.storage
					.from("insurance")
					.getPublicUrl(filePath);
				insuranceUrl = urlData.publicUrl;
			}

			// Insert profile data into profiles table
			const { error: profileError } = await supabase.from("profiles").insert({
				id: user.id,
				first_name: formData.firstName,
				middle_name: formData.middleName,
				last_name: formData.lastName,
				email: formData.email,
				phone_number: formData.phoneNumber,
				address: formData.address,
				car_brand: formData.selectedBrand,
				car_model: formData.selectedModel,
				car_registration_number: formData.carNumber,
				drivers_license_number: formData.driversLicenseNumber,
				insurance_file_url: insuranceUrl,
			});
			if (profileError) throw profileError;

			alert(
				"Sign-up successful! Please check your email for confirmation if required."
			);
			router.push("/dashboard");
		} catch (error) {
			alert("Sign-up failed: " + (error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignUp = async () => {
		// Store form data in localStorage to retrieve after OAuth redirect
		localStorage.setItem("signupFormData", JSON.stringify(formData));
		localStorage.setItem("insuranceFileName", insuranceFile?.name || "");
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/auth/callback` },
		});
		if (error) alert("Google Sign-Up failed: " + error.message);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
				<h1 className="text-2xl font-bold mb-6 text-center">Driver Sign Up</h1>

				{/* Auth Method Selection */}
				<div className="flex justify-center space-x-4 mb-4">
					<button
						onClick={() => setAuthMethod("email")}
						className={`px-4 py-2 rounded-lg ${
							authMethod === "email" ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}
					>
						Email & Password
					</button>
					<button
						onClick={() => setAuthMethod("google")}
						className={`px-4 py-2 rounded-lg ${
							authMethod === "google" ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}
					>
						Google
					</button>
				</div>

				{/* Sign-Up Form */}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						authMethod === "email" ? handleEmailSignUp() : handleGoogleSignUp();
					}}
					className="space-y-4"
				>
					<div className="flex space-x-2">
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={handleInputChange}
							placeholder="First Name"
							className="w-1/3 px-4 py-2 border rounded-lg"
							required
						/>
						<input
							type="text"
							name="middleName"
							value={formData.middleName}
							onChange={handleInputChange}
							placeholder="Middle Name"
							className="w-1/3 px-4 py-2 border rounded-lg"
						/>
						<input
							type="text"
							name="lastName"
							value={formData.lastName}
							onChange={handleInputChange}
							placeholder="Last Name"
							className="w-1/3 px-4 py-2 border rounded-lg"
							required
						/>
					</div>
					{authMethod === "email" && (
						<>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="Email"
								className="w-full px-4 py-2 border rounded-lg"
								required
							/>
							<input
								type="password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								placeholder="Password"
								className="w-full px-4 py-2 border rounded-lg"
								required
							/>
							<input
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								placeholder="Confirm Password"
								className="w-full px-4 py-2 border rounded-lg"
								required
							/>
						</>
					)}
					<input
						type="text"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleInputChange}
						placeholder="Phone Number"
						className="w-full px-4 py-2 border rounded-lg"
						required
					/>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleInputChange}
						placeholder="Address"
						className="w-full px-4 py-2 border rounded-lg"
						required
					/>
					<select
						name="selectedBrand"
						value={formData.selectedBrand}
						onChange={handleInputChange}
						className="w-full px-4 py-2 border rounded-lg"
						required
					>
						<option value="">Select Car Brand</option>
						{Object.keys(carBrands).map((brand) => (
							<option key={brand} value={brand}>
								{brand}
							</option>
						))}
					</select>
					<select
						name="selectedModel"
						value={formData.selectedModel}
						onChange={handleInputChange}
						className="w-full px-4 py-2 border rounded-lg"
						required
					>
						<option value="">Select Model</option>
						{formData.selectedBrand &&
							carBrands[formData.selectedBrand].map((model) => (
								<option key={model} value={model}>
									{model}
								</option>
							))}
					</select>
					<input
						type="text"
						name="carNumber"
						value={formData.carNumber}
						onChange={handleInputChange}
						placeholder="Car Registration Number"
						className="w-full px-4 py-2 border rounded-lg"
						required
					/>
					<input
						type="text"
						name="driversLicenseNumber"
						value={formData.driversLicenseNumber}
						onChange={handleInputChange}
						placeholder="Driver's License Number"
						className="w-full px-4 py-2 border rounded-lg"
						required
					/>
					<input
						type="file"
						onChange={handleFileChange}
						className="w-full px-4 py-2 border rounded-lg"
					/>
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-500 text-white py-2 rounded-lg"
					>
						{loading
							? "Processing..."
							: authMethod === "email"
							? "Sign Up with Email"
							: "Sign Up with Google"}
					</button>
				</form>
			</div>
		</div>
	);
}
