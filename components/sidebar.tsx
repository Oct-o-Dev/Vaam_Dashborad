"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, Wallet, CreditCard, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const routes = [
	{
		label: "Dashboard",
		icon: LayoutDashboard,
		href: "/",
		color: "text-sky-500",
	},
	{
		label: "My Account",
		icon: User,
		href: "/account",
		color: "text-violet-500",
	},
	{
		label: "Earnings",
		icon: Wallet,
		href: "/earnings",
		color: "text-pink-700",
	},
	{
		label: "Subscription",
		icon: CreditCard,
		href: "/subscription",
		color: "text-orange-700",
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Mobile: Black Strip with Hamburger Button */}
			<div className="md:hidden fixed top-0 left-0 h-16 w-16 bg-black z-50 flex items-center justify-center">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-gray-800"
						>
							<Menu className="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="bg-black text-white p-0">
						<div className="space-y-4 py-4 flex flex-col h-full">
							<div className="px-3 py-2 flex-1">
								<Link
									href="/"
									className="flex items-center pl-3 mb-14"
									onClick={() => setIsOpen(false)}
								>
									<h1 className="flex text-2xl font-bold">DriveHub</h1>
								</Link>

								<div className="space-y-1">
									{routes.map((route) => (
										<Link
											key={route.href}
											href={route.href}
											className={cn(
												"text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-[#ffd342] hover:text-black rounded-lg transition",
												pathname === route.href
													? "bg-[#ffd342] text-black"
													: "text-zinc-400"
											)}
											onClick={() => setIsOpen(false)}
										>
											<div className="flex items-center flex-1">
												<route.icon
													className={cn("h-5 w-5 mr-3", route.color)}
												/>
												{route.label}
											</div>
										</Link>
									))}
								</div>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>

			{/* Desktop Sidebar */}
			<div className="hidden md:flex space-y-4 py-4 flex-col h-full bg-black text-white">
				<div className="px-3 py-2 flex-1">
					<Link href="/" className="flex items-center pl-3 mb-14">
						<h1 className="flex text-2xl font-bold">DriveHub</h1>
					</Link>

					<div className="space-y-1">
						{routes.map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className={cn(
									"text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-[#ffd342] hover:text-black rounded-lg transition",
									pathname === route.href
										? "bg-[#ffd342] text-black"
										: "text-zinc-400"
								)}
							>
								<div className="flex items-center flex-1">
									<route.icon className={cn("h-5 w-5 mr-3", route.color)} />
									{route.label}
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
