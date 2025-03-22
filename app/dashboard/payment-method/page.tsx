'use client';

import { useRouter } from 'next/navigation';
import { CreditCard, Wallet, Plus, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function PaymentMethodPage() {
  const router = useRouter();

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

      <h1 className="text-2xl font-bold mb-8">Select Payment Method</h1>

      <div className="space-y-6">
        <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Wallet className="text-primary" size={24} />
              </div>
              <div>
                <div className="font-semibold text-lg">Vamm Wallet</div>
                <div className="text-[var(--text-secondary)]">Balance: £87.00</div>
              </div>
            </div>
            <input type="radio" name="payment" className="h-5 w-5 accent-primary" />
          </div>
          <button className="mt-4 text-primary font-medium flex items-center gap-2 hover:text-[#e6bd3b] transition-colors">
            <Plus size={18} /> Add Money
          </button>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
          <h2 className="text-[var(--text-secondary)] font-medium mb-4">Credit & Debit Cards</h2>
          
          <div className="space-y-4">
            {[
              { name: 'Apple Pay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/124px-PayPal.svg.png' },
              { name: 'Mastercard ....6854', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png' },
              { name: 'Visa ....2463', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png' }
            ].map((card) => (
              <div key={card.name} className="flex items-center justify-between p-3 hover:bg-[var(--bg-primary)] rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <img src={card.logo} alt={card.name} className="h-8 w-auto" />
                  <span className="font-medium">{card.name}</span>
                </div>
                <input type="radio" name="payment" className="h-5 w-5 accent-primary" />
              </div>
            ))}
          </div>

          <button 
            onClick={() => router.push('dashboard/add-card')}
            className="mt-6 text-primary font-medium flex items-center gap-2 hover:text-[#e6bd3b] transition-colors"
          >
            <CreditCard size={18} /> Add New Card
          </button>
        </div>

        <button className="w-full bg-[#ffd342] text-black py-4 rounded-xl font-semibold text-lg hover:bg-[#e6bd3b] transition-colors">
          Confirm Payment
        </button>
      </div>
    </div>
  );
}