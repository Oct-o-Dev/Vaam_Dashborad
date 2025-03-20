"use client"; // Mark this as a Client Component

import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Sidebar } from '@/components/sidebar';
import { UserInfo } from '@/components/user-info';
import { SessionContextProvider } from '@supabase/auth-helpers-react'; // Import SessionContextProvider
import { supabase } from '@/lib/supabase'; // Import your Supabase client

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionContextProvider supabaseClient={supabase}> {/* Wrap everything in SessionContextProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="driver-theme"
          >
            <div className="h-screen relative">
              {/* Mobile Sidebar (Hamburger Menu) */}
              <div className="md:hidden">
                <Sidebar />
              </div>

              {/* Desktop Sidebar */}
              <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 flex flex-col overflow-y-auto">
                    <Sidebar />
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="md:pl-72">
                <div className="flex min-h-screen">
                  <div className="flex-1 p-4 md:p-8">
                    {children}
                  </div>

                  {/* User Info Sidebar */}
                  <div className="hidden xl:block w-80 p-8 border-l">
                    <UserInfo />
                  </div>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}