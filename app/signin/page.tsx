// app/signin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSupabase } from "@/lib/supabase-client";

export default function SignIn() {
	const { supabase } = useSupabase();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// Email/password sign-in handler
	const handleSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;

			if (data.user) {
				router.refresh(); // Refresh to update auth state
				router.push("/dashboard");
			}
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "An error occurred during sign-in"
			);
		} finally {
			setIsLoading(false);
		}
	};

	// Google sign-in handler
	const handleGoogleSignIn = async () => {
		setError(null);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});

		if (error) {
			console.error("Google sign-in error:", error);
			setError(error.message);
		}
		// Note: No redirect handling here; Supabase redirects to /auth/callback
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
				<h2 className="text-center text-3xl font-extrabold text-gray-900">
					Sign In
				</h2>
				<form className="mt-8 space-y-6" onSubmit={handleSignIn}>
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
							{error}
						</div>
					)}
					<div className="space-y-4">
						<input
							type="email"
							autoComplete="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							placeholder="Email address"
						/>
						<input
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
				<div className="flex items-center justify-center py-4">
					<hr className="w-full border-gray-300" />
					<span className="px-2 text-gray-500">or</span>
					<hr className="w-full border-gray-300" />
				</div>
				<button
					onClick={handleGoogleSignIn}
					className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
				>
					Sign in with Google
				</button>
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
