"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [carName, setCarName] = useState('');
  const [carRegistrationNumber, setCarRegistrationNumber] = useState('');
  const [driversLicenseNumber, setDriversLicenseNumber] = useState('');
  const [insuranceDetails, setInsuranceDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    try {
      // Step 1: Sign up the user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName,
            phone_number: phoneNumber,
            address: address,
            car_name: carName,
            car_registration_number: carRegistrationNumber,
            drivers_license_number: driversLicenseNumber,
            insurance_details: insuranceDetails,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      // Step 2: Wait for the user to be confirmed (optional)
      // You can add a check here to ensure the user is confirmed before proceeding.

      // Step 3: Insert profile data into the profiles table
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: user.id, 
            display_name: fullName,
            phone_number: phoneNumber,
            address: address,
            car_name: carName,
            car_registration_number: carRegistrationNumber,
            drivers_license_number: driversLicenseNumber,
            insurance_details: insuranceDetails,
          }]);

        if (profileError) {
          throw profileError;
        }

        alert('Check your email for confirmation!');
      }
    } catch (error) {
      // Type guard to handle the 'unknown' type error
      if (error instanceof Error) {
        console.error('Error:', error.message);
        alert('Sign-up failed: ' + error.message);
      } else {
        console.error('An unknown error occurred:', error);
        alert('Sign-up failed: An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Driver Sign Up</h1>
        <div className="space-y-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            placeholder="Car Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={carRegistrationNumber}
            onChange={(e) => setCarRegistrationNumber(e.target.value)}
            placeholder="Car Registration Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={driversLicenseNumber}
            onChange={(e) => setDriversLicenseNumber(e.target.value)}
            placeholder="Driver's License Number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={insuranceDetails}
            onChange={(e) => setInsuranceDetails(e.target.value)}
            placeholder="Insurance Details"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-blue-300"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}