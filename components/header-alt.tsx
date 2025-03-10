"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
// import { createSupabaseBrowser } from "@/lib/supabase/client";
import { ModeToggle } from "@/components/global/ModeToggle";
import { Button } from "@/components/ui/button";
import { NavigationMobile } from "@/components/global/NavigationMobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedOut, SignInButton, SignUpButton, SignedIn, UserButton } from "@clerk/nextjs";

const navigationItems = [
  { title: "Home", href: "/", description: "" },
  { title: "About us", href: "/about", description: "" },
  {
    title: "Newsletter",
    href: "/newsletter",
    description: "",
  },
  { title: "Contact Us", href: "/contact", description: "" },
];

export function Header() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleRedirect = async () => {
    // const supabase = createSupabaseBrowser();
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser();

    // if (user) {
      router.push("/drive-with-us");
    // } else {
    //   router.push("/register");
    // }
  };

  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/60 backdrop-blur-lg border-b">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="relative w-32 h-10">
            {mounted && (
              <Image
                src={
                  resolvedTheme === "dark"
                    ? "/vaam-logo-full-light.png"
                    : "/vaam-logo-full.png"
                }
                alt="Vaam"
                sizes="auto"
                fill
                priority
                className="object-contain"
              />
            )}
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className="hidden md:flex space-x-12">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </div>

        



        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <ModeToggle />
          </div>
          <div className="md:hidden">
            <NavigationMobile
              components={navigationItems}
              onDriveWithUsClick={handleRedirect}
            />
          </div>
          {/* CTA: Drive with us for PC */}
          <div className="hidden md:block">
            <Button size="sm" className="font-bold" onClick={handleRedirect}>
              Drive with us
            </Button>
          </div>
          {/* Dark/Light Mode Toggle for PC */}
          
        </div>
      </div>
    </header>
  );
}
