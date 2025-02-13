import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Account</h2>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Dummy" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="asdf@example.com" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Driver Street, City" />
            </div>
            <Button className="bg-black text-white hover:bg-black/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}