"use client"; // Mark this as a Client Component

import "./globals.css";
import { Inter } from "next/font/google";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useSupabase } from "@/lib/supabase-client"; 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { supabase } = useSupabase();

	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionContextProvider supabaseClient={supabase}>
					<main>{children}</main>
				</SessionContextProvider>
			</body>
		</html>
	);
}
