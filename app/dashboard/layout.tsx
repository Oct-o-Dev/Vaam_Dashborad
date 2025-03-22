"use client"; 

import "../globals.css";
import { ThemeProvider } from "next-themes";
import { Sidebar } from "@/components/sidebar";
import { UserInfo } from "@/components/user-info";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/lib/supabase-client";


export default function DashboeardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { supabase } = useSupabase();
	const router = useRouter();

	useEffect(() => {
		const checkSession = async () => {
			const { data, error } = await supabase.auth.getSession();

			if (!data?.session) {
				router.push("/signin"); // Redirect if no session

				console.log("hii")
			} else {
				console.log("Session:", data.session);
			}
		};

		checkSession();
	}, [router]);


	return (
		<html lang="en">
				<SessionContextProvider supabaseClient={supabase}>
					
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
				</SessionContextProvider>
		</html>
	);
}
