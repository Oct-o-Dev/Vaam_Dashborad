'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, AlertCircle, Shield, Zap, Trophy } from 'lucide-react';

export default function SubscriptionPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  const benefits = [
    { icon: Shield, text: "Priority Support 24/7" },
    { icon: Zap, text: "Unlimited Ride Requests" },
    { icon: Trophy, text: "Premium Driver Status" }
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto pt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">Driver Subscription</h1>
      
      <div className="bg-[var(--bg-secondary)] dark:bg-black rounded-2xl p-8 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Premium Weekly Plan</h2>
          <span className="bg-[#ffd342] px-4 py-1.5 rounded-full text-black font-medium">
            Recommended
          </span>
        </div>
        
        <div className="space-y-4 mb-8">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon className="text-primary" size={20} />
              <span>{text}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <CalendarDays className="text-primary" />
          <span>Next renewal on {expiryDate.toLocaleDateString()}</span>
        </div>
        
        <div className="mb-8">
          <div className="text-3xl font-bold">£29.99<span className="text-lg font-normal">/week</span></div>
          <p className="text-[var(--text-secondary)] mt-1">Cancel anytime, no questions asked</p>
        </div>
        
        <button
          onClick={() => router.push('/payment-method')}
          className="w-full bg-[#ffd342] text-black py-4 rounded-xl font-semibold text-lg mb-4 hover:bg-[#e6bd3b] transition-colors"
        >
          Renew Subscription
        </button>
      </div>

      <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full text-red-500 py-2 rounded-lg font-medium hover:bg-red-500/10 transition-colors"
        >
          Cancel Subscription
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border   shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-[#ffd342]" size={24} />
              <h3 className="text-xl font-semibold text-black dark:text-white">Cancel Subscription?</h3>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Are you sure you want to cancel your subscription? You'll lose access to all premium features at the end of your current billing period.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-800 text-black dark:text-white py-3 rounded-xl transition-colors hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 bg-[#ffd342] text-black py-3 rounded-xl transition-colors hover:bg-[#e6be2e] dark:hover:bg-[#e6be2e]"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}