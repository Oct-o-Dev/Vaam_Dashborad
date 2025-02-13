import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Weekly",
    price: 29.99,
    features: [
      "Basic driver support",
      "Standard ride requests",
      "Weekly payment processing",
      "Basic analytics"
    ]
  },
  {
    name: "Monthly",
    price: 99.99,
    popular: true,
    features: [
      "Priority driver support",
      "Premium ride requests",
      "Instant payment processing",
      "Advanced analytics",
      "Route optimization"
    ]
  },
  {
    name: "Yearly",
    price: 999.99,
    features: [
      "24/7 VIP support",
      "Premium ride requests",
      "Instant payment processing",
      "Advanced analytics",
      "Route optimization",
      "Exclusive driver events",
      "Insurance benefits"
    ]
  }
]

export default function SubscriptionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Subscription Plans</h2>
        <p className="text-muted-foreground">
          Choose the best plan for your driving needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? "border-[#ffd342] border-2" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {plan.name}
                {plan.popular && (
                  <span className="bg-[#ffd342] text-black text-xs px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground ml-1">
                  /{plan.name.toLowerCase()}
                </span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-[#ffd342] mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-black text-white hover:bg-black/90">
                {plan.popular ? "Upgrade Now" : "Get Started"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-black text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Current Plan: Monthly</h3>
              <p className="text-zinc-400">Your next billing date is February 1, 2025</p>
            </div>
            <Button variant="outline" className="border-[#ffd342] text-[#ffd342] hover:bg-[#ffd342] hover:text-black">
              Manage Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}