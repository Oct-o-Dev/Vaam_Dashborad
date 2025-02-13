"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const monthlyData = [
  { month: 'Jan', earnings: 3200 },
  { month: 'Feb', earnings: 3800 },
  { month: 'Mar', earnings: 4200 },
  { month: 'Apr', earnings: 3900 },
  { month: 'May', earnings: 4600 },
  { month: 'Jun', earnings: 4800 },
]

const recentTransfers = [
  {
    id: "TRF-001",
    date: "2025-01-15",
    amount: 245.00,
    status: "Completed"
  },
  {
    id: "TRF-002",
    date: "2025-01-14",
    amount: 189.50,
    status: "Completed"
  },
  {
    id: "TRF-003",
    date: "2025-01-13",
    amount: 312.75,
    status: "Completed"
  }
]

export default function EarningsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Earnings Overview</h2>
        <p className="text-muted-foreground">
          Track your earnings and payment history
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#ffd342" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransfers.map((transfer) => (
              <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{transfer.id}</p>
                  <p className="text-sm text-muted-foreground">{transfer.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${transfer.amount.toFixed(2)}</p>
                  <p className="text-sm text-green-500">{transfer.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}