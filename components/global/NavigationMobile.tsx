"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavigationMobileProps {
  components: {
    title: string;
    href: string;
    description: string;
  }[];
  onDriveWithUsClick: () => void; // Callback for "Drive with Us" button
}

export function NavigationMobile({
  components,
  onDriveWithUsClick,
}: NavigationMobileProps) {
  const [isOpen, setIsOpen] = useState(false); // State to manage sheet visibility

  const handleLinkClick = () => {
    setIsOpen(false); // Close the sheet when a link is clicked
  };

  return (
    <div className="flex justify-end">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[100vw] bg-background">
          <SheetHeader>
            <SheetTitle className="text-xl font-semibold text-primary">
              Menu
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-4 space-y-4 text-center">
            {components.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block px-4 py-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                onClick={handleLinkClick} // Close sheet on link click
              >
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </Link>
            ))}
            <div className="border-t mt-4 pt-4 px-4">
              <Button
                className="w-full bg-primary text-black hover:bg-primary/90 font-bold"
                onClick={() => {
                  handleLinkClick(); // Close sheet
                  onDriveWithUsClick(); // Trigger "Drive with Us" action
                }}
              >
                Drive with Us
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
