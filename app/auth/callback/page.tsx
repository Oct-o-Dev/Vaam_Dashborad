// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";

export default function AuthCallback() {
	const { supabase } = useSupabase();
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function handleCallback() {
			try {
				const { data, error } = await supabase.auth.getSession();
				if (error) throw error;
				if (!data.session) throw new Error("No session found");

				const user = data.session.user;

				// Check if profile exists
				const { data: profile } = await supabase
					.from("profiles")
					.select("*", { head: false }) // Fix for 406 error
					.eq("id", user.id)
					.single();


				if (profile) {
					console.log("Profile found, redirecting to dashboard...");
					router.push("/dashboard");
					return;
				}

				// Retrieve form data from localStorage
				const formDataString = localStorage.getItem("signupFormData");
				const insuranceFileName = localStorage.getItem("insuranceFileName");
				if (!formDataString) {
					router.push("/signup"); // Form data missing, redirect back
					return;
				}

				const formData = JSON.parse(formDataString);

				// Upload insurance file if it was provided (assumes file is re-uploaded or handled separately)
				let insuranceUrl = "";
				// Note: File upload requires the file object, which can't be persisted in localStorage.
				// For simplicity, assume the file upload is optional or re-uploaded post-OAuth if needed.

				// Insert profile data
				const { error: profileError } = await supabase.from("profiles").insert({
					id: user.id,
					first_name: formData.firstName,
					middle_name: formData.middleName,
					last_name: formData.lastName,
					phone_number: formData.phoneNumber,
					address: formData.address,
					car_brand: formData.selectedBrand,
					car_model: formData.selectedModel,
					car_registration_number: formData.carNumber,
					drivers_license_number: formData.driversLicenseNumber,
					insurance_file_url: insuranceUrl,
				});
				if (profileError) throw profileError;

				// Clear localStorage
				localStorage.removeItem("signupFormData");
				localStorage.removeItem("insuranceFileName");
				router.push("/dashboard");
			} catch (error) {
				console.error("Callback error:", error);
				alert("Authentication failed: " + (error as Error).message);
				router.push("/signup");
			} finally {
				setLoading(false);
			}
		}
		handleCallback();
	}, [supabase, router]);

	return (
        <div>{loading ? "Loading..." : "Processing authentication..."}</div>
    )
}
