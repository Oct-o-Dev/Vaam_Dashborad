"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Profile {
  display_name: string;
  phone_number: string;
  address: string;
  car_name: string;
  car_registration_number: string;
  drivers_license_number: string;
  insurance_details: string;
}

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile>({
    display_name: '',
    phone_number: '',
    address: '',
    car_name: '',
    car_registration_number: '',
    drivers_license_number: '',
    insurance_details: '',
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('display_name, phone_number, address, car_name, car_registration_number, drivers_license_number, insurance_details')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
        } else {
          setProfile(data);
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: profile.display_name,
          phone_number: profile.phone_number,
          address: profile.address,
          car_name: profile.car_name,
          car_registration_number: profile.car_registration_number,
          drivers_license_number: profile.drivers_license_number,
          insurance_details: profile.insurance_details,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error.message);
        alert('Failed to update profile: ' + error.message);
      } else {
        alert('Profile updated successfully!');
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <form onSubmit={handleSubmit}>
              <div className="grid gap-3">
                <Label htmlFor="display_name">Full Name</Label>
                <Input
                  id="display_name"
                  value={profile.display_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={profile.phone_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profile.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="car_name">Car Name</Label>
                <Input
                  id="car_name"
                  value={profile.car_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="car_registration_number">Car Registration Number</Label>
                <Input
                  id="car_registration_number"
                  value={profile.car_registration_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="drivers_license_number">Driver's License Number</Label>
                <Input
                  id="drivers_license_number"
                  value={profile.drivers_license_number}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="insurance_details">Insurance Details</Label>
                <Input
                  id="insurance_details"
                  value={profile.insurance_details}
                  onChange={handleInputChange}
                />
              </div>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-black/90"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}