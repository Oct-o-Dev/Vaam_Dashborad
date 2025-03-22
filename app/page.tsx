"use client";

import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div className="min-h-screen flex flex-col bg-black">
			<nav className="w-full p-4 flex justify-end bg-gray-900 shadow-md">
				<button
					onClick={() => router.push("/dashboard")}
					className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
				>
					Dashboard
				</button>
			</nav>
		</div>
	);
}
