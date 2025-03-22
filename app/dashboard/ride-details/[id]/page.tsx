// app/ride-details/[id]/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RideDetails({ params }: { params: { id: string } }) {
  const ride = {
    id: params.id,
    date: "12/12/2024",
    time: "12:00 AM",
    duration: "32.4 mins",
    pickup: "Serica Court, 154 Serica Court, Greenwich High Road, London, SE10 8NZ, England",
    destination: "Soho Square, London W1D 3QP, United Kingdom",
  };

  return (
    <main className="min-h-screen  p-6 md:p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-4">
        {/* Back Button */}
        <Link href="/dashboard">
          <button className="flex items-center gap-2 text-black dark:text-white hover:text-[#ffd342] dark:hover:text-[#ffd342] transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
        </Link>

        {/* Ride Details Card */}
        <Card className="bg-white dark:bg-black border border-gray-200 dark:border-[#ffd342]/50 rounded-xl shadow-lg">
          <CardHeader className="border-b border-gray-200 dark:border-[#ffd342]/30">
            <CardTitle className="text-2xl font-semibold text-black dark:text-white flex items-center gap-2">
              <MapPin className="h-6 w-6 text-[#ffd342]" />
              Ride Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            {/* Location and Date */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-black dark:text-white">London</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">Soho Square</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Calendar className="h-4 w-4 text-[#ffd342]" />
                <p className="text-sm text-gray-500 dark:text-gray-400">{ride.date}</p>
              </div>
            </div>

            {/* Time and Duration */}
            <div className="flex justify-center items-center gap-6    rounded-lg py-4 px-6 shadow-sm">
              <div className="text-center">
                <p className="text-xl font-bold text-[#ffd342]">{ride.time}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Start Time</p>
              </div>
              <div className="h-10 w-px bg-gray-300 dark:bg-[#ffd342]/50"></div>
              <div className="text-center">
                <p className="text-xl font-bold text-[#ffd342]">{ride.duration}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Duration</p>
              </div>
            </div>

            {/* Pickup and Destination */}
            <div className="space-y-4  border border-gray-200 dark:border-[#ffd342]/30 rounded-lg p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 bg-[#ffd342] rounded-full mt-1"></span>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">Pickup</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ride.pickup}</p>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <span className="text-gray-500 dark:text-gray-400 mx-5">↓</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-4 h-4 bg-[#ffd342] rounded-full mt-1"></span>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">Destination</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ride.destination}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
              <button className="bg-white dark:bg-gray-800 text-[#ffd342] text-sm font-medium py-2 px-6 rounded-full border border-[#ffd342] hover:bg-[#ffd342] hover:text-black dark:hover:text-black transition-colors shadow-sm">
                Get Receipt
              </button>
              <button className="bg-[#ffd342] text-black text-sm font-medium py-2 px-6 rounded-full hover:bg-[#e6be2e] transition-colors shadow-sm">
                Rebook
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}