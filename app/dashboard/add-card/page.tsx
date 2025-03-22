'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, ArrowLeft, CreditCard } from 'lucide-react';

export default function AddCardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expDate: '',
    cvv: '',
    name: '',
    nickname: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto pt-16">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-primary/10 p-3 rounded-full">
          <CreditCard className="text-primary" size={24} />
        </div>
        <h1 className="text-2xl font-bold">Add New Card</h1>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-2">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="w-full bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--text-secondary)]/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-[var(--text-secondary)] font-medium mb-2">Exp. Date</label>
            <input
              type="text"
              name="expDate"
              value={formData.expDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--text-secondary)]/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[var(--text-secondary)] font-medium mb-2">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--text-secondary)]/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-2">Name on Card</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name on card"
            className="w-full bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--text-secondary)]/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-2">Country</label>
          <button className="w-full bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--text-secondary)]/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>🇬🇧</span>
              <span>United Kingdom</span>
            </div>
            <ChevronDown className="text-[var(--text-secondary)]" />
          </button>
        </div>

        <div>
          <label className="block text-[var(--text-secondary)] font-medium mb-2">Card Nickname (Optional)</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="e.g., Work Card"
            className="w-full bg-[var(--bg-secondary)] rounded-xl p-4 border border-[var(--text-secondary)]/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-[#ffd342] text-black py-4 rounded-xl font-semibold text-lg mt-8 hover:bg-[#e6bd3b] transition-colors"
        >
          Add Card
        </button>
      </form>
    </div>
  );
}