import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { UserInfo } from "@/components/user-info"
import { Header } from "@/components/header-alt" // Import Header component

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Driver Dashboard',
  description: 'Professional dashboard for ride-sharing drivers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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

            {/* Main Content */}
            <main className="md:pl-72">
              {/* Navbar */}
              <Header />  

              <div className="flex min-h-screen">
                <div className="flex-1 p-8">
                  {children}
                </div>
                {/* User Info Sidebar */}
                <div className="hidden xl:block w-80 p-8 border-l">
                  <UserInfo />
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
