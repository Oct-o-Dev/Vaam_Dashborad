"use client"; // Mark this as a client component
import { useUser } from '@supabase/auth-helpers-react';
import { Sidebar } from "@/components/sidebar";
import { UserInfo } from "@/components/user-info";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const user = useUser(); // Safe to use here because this is a client component

  return (
    <div className="h-screen relative">
      {user && (
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
      <main className={user ? 'md:pl-72' : ''}>
        {children}
        {user && (
          <div className="hidden xl:block w-80 p-8 border-l">
            <UserInfo />
          </div>
        )}
      </main>
    </div>
  );
}