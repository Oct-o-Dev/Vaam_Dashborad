import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, MapPin, Timer } from "lucide-react"

const recentRides = [
  {
    id: "RIDE-001",
    pickup: "Downtown",
    destination: "Airport",
    earnings: 45.00,
    time: "35 mins"
  },
  {
    id: "RIDE-002",
    pickup: "Mall",
    destination: "Station",
    earnings: 25.00,
    time: "20 mins"
  },
  {
    id: "RIDE-003",
    pickup: "Hotel",
    destination: "Beach",
    earnings: 35.00,
    time: "25 mins"
  }
]

export default function Home() {
  return (
    <main className="p-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, K.! 👋</h2>
          <p className="text-muted-foreground">
            Here's an overview of your recent activity
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-black text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              <Car className="h-4 w-4 text-[#ffd342]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$245.00</div>
              <p className="text-xs text-zinc-400">+5% from yesterday</p>
            </CardContent>
          </Card>
          <Card className="bg-black text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
              <Timer className="h-4 w-4 text-[#ffd342]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-zinc-400">Completed today</p>
            </CardContent>
          </Card>
          <Card className="bg-black text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Hours</CardTitle>
              <MapPin className="h-4 w-4 text-[#ffd342]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5h</div>
              <p className="text-xs text-zinc-400">Today's active time</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRides.map((ride) => (
                <div key={ride.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{ride.id}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{ride.pickup}</span>
                      <span className="mx-2">→</span>
                      <span>{ride.destination}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${ride.earnings.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{ride.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
