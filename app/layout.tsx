"use client"; // Mark this as a Client Component

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/sidebar";
import { UserInfo } from "@/components/user-info";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation"; // Import usePathname to get the current route

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname(); // Get the current path

	// Define routes that should not use the layout
	const noLayoutRoutes = ["/signin", "/signup"];

	// Check if the current route matches any of the excluded routes
	const isNoLayoutRoute = noLayoutRoutes.includes(pathname);

	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionContextProvider supabaseClient={supabase}>
					{isNoLayoutRoute ? (
						// Render only children for excluded routes
						<>{children}</>
					) : (
						<ThemeProvider
							attribute="class"
							defaultTheme="light"
							enableSystem={false}
							storageKey="driver-theme"
						>
							<div className="h-screen relative">
								{/* Sidebar */}
								<div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
									<div className="flex-1 flex flex-col min-h-0">
										<div className="flex-1 flex flex-col overflow-y-auto">
											<Sidebar />
										</div>
									</div>
								</div>
								{/* Main content area */}
								<div className="md:pl-72">
									<div className="flex min-h-screen">
										<div className="flex-1 p-8">{children}</div>
										{/* User Info Sidebar */}
										<div className="hidden xl:block w-80 p-8 border-l">
											<UserInfo />
										</div>
									</div>
								</div>
							</div>
						</ThemeProvider>
					)}
				</SessionContextProvider>
			</body>
		</html>
	);
}
