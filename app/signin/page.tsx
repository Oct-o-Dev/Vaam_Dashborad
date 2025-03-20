"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
	
export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent form submission refresh
		setIsLoading(true);
		setError(null);

		try {
			console.log("Attempting to sign in with:", email);
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				console.error("Sign-in error:", error);
				throw error;
			}

			if (data.user) {
				console.log("Sign-in successful, redirecting...");
				console.log("User Info:", data.user); // Log user info
				console.log("Session Info:", data.session); // Log session info

				// Add a small delay before redirection
				setTimeout(() => {
					router.push("/");
				}, 1000); // 1 second delay
			}
		} catch (error) {
			console.error("Caught error during sign in:", error);
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An error occurred during sign in");
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-center text-3xl font-extrabold text-gray-900">
					Sign in
				</h2>
				<form className="mt-8 space-y-6" onSubmit={handleSignIn}>
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
							{error}
						</div>
					)}
					<div className="space-y-4">
						<input
							id="email"
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							placeholder="Email address"
						/>
						<input
							id="password"
							type="password"
							autoComplete="current-password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							placeholder="Password"
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
					>
						{isLoading ? "Signing in..." : "Sign in"}
					</button>
				</form>
				<p className="text-center text-sm text-gray-600">
					New here?{" "}
					<Link href="/signup" className="text-blue-600 hover:underline">
						Create an account
					</Link>
				</p>
			</div>
		</div>
	);
}
