'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Clock, MapPin } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#1a1a1a',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      padding: 12,
      displayColors: false,
      callbacks: {
        label: function(context: any) {
          return `£${context.parsed.y}`;
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#a3a3a3',
      }
    },
    y: {
      grid: {
        color: '#333333',
      },
      ticks: {
        color: '#a3a3a3',
        callback: function(value: any) {
          return '£' + value;
        }
      }
    }
  }
};

const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [120, 85, 150, 95, 180, 210, 165],
      backgroundColor: '#ffd342',
      borderRadius: 8,
      borderSkipped: false,
    }
  ]
};

const monthlyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      data: [850, 920, 780, 1100],
      backgroundColor: '#ffd342',
      borderRadius: 8,
      borderSkipped: false,
    }
  ]
};

const recentTransactions = [
  {
    id: 1,
    type: 'Airport Transfer',
    amount: 45.00,
    date: new Date(2024, 1, 15, 14, 30),
    location: 'Heathrow Airport',
    status: 'completed'
  },
  {
    id: 2,
    type: 'City Ride',
    amount: 28.50,
    date: new Date(2024, 1, 15, 12, 15),
    location: 'Central London',
    status: 'completed'
  },
  {
    id: 3,
    type: 'Subscription Fee',
    amount: -29.99,
    date: new Date(2024, 1, 15, 0, 0),
    location: 'System',
    status: 'deducted'
  },
  {
    id: 4,
    type: 'Long Distance',
    amount: 75.20,
    date: new Date(2024, 1, 14, 18, 45),
    location: 'Brighton',
    status: 'completed'
  },
  {
    id: 5,
    type: 'Express Delivery',
    amount: 32.00,
    date: new Date(2024, 1, 14, 15, 20),
    location: 'Manchester',
    status: 'completed'
  }
];

export default function EarningsPage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const totalEarnings = timeframe === 'weekly' ? 1005 : 3650;
  const comparisonPercent = timeframe === 'weekly' ? 12.5 : 8.2;

  return (
    <div className="p-6 max-w-7xl mx-auto pt-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Earnings Dashboard</h1>
          <p className="text-[var(--text-secondary)]">
            Track your earnings and financial performance
          </p>
        </div>
        
        <div className="flex items-center bg-[var(--bg-secondary)] rounded-xl p-1">
          <button
            onClick={() => setTimeframe('weekly')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              timeframe === 'weekly'
                ? 'bg-[#ffd342] text-black'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeframe('monthly')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              timeframe === 'monthly'
                ? 'bg-[#ffd342] text-black'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">£{totalEarnings.toFixed(2)}</h2>
              <p className="text-[var(--text-secondary)] flex items-center gap-2">
                <span>vs previous {timeframe === 'weekly' ? 'week' : 'month'}</span>
                <span className={`flex items-center ${comparisonPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {comparisonPercent >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {Math.abs(comparisonPercent)}%
                </span>
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <TrendingUp className="text-primary" size={24} />
            </div>
          </div>
          <div className="h-[300px]">
            <Bar 
              options={options} 
              data={timeframe === 'weekly' ? weeklyData : monthlyData} 
            />
          </div>
        </div>

        <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="p-4 bg-[var(--bg-primary)] rounded-xl">
              <p className="text-[var(--text-secondary)] mb-1">Total Rides</p>
              <p className="text-2xl font-bold">{timeframe === 'weekly' ? '42' : '168'}</p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)] rounded-xl">
              <p className="text-[var(--text-secondary)] mb-1">Average Per Ride</p>
              <p className="text-2xl font-bold">£{(totalEarnings / (timeframe === 'weekly' ? 42 : 168)).toFixed(2)}</p>
            </div>
            <div className="p-4 bg-[var(--bg-primary)] rounded-xl">
              <p className="text-[var(--text-secondary)] mb-1">Online Hours</p>
              <p className="text-2xl font-bold">{timeframe === 'weekly' ? '38' : '152'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-secondary)] rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[var(--text-secondary)] border-b border-[var(--text-secondary)]/10">
                <th className="text-left pb-4">Type</th>
                <th className="text-left pb-4">Amount</th>
                <th className="text-left pb-4">Date & Time</th>
                <th className="text-left pb-4">Location</th>
                <th className="text-left pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-[var(--text-secondary)]/10">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {transaction.type === 'Subscription Fee' ? (
                        <div className="bg-red-500/10 p-2 rounded-full">
                          <Clock className="text-red-500" size={20} />
                        </div>
                      ) : (
                        <div className="bg-green-500/10 p-2 rounded-full">
                          <MapPin className="text-green-500" size={20} />
                        </div>
                      )}
                      {transaction.type}
                    </div>
                  </td>
                  <td className={`py-4 ${
                    transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {transaction.amount < 0 ? '-' : '+'}£{Math.abs(transaction.amount).toFixed(2)}
                  </td>
                  <td className="py-4 text-[var(--text-secondary)]">
                    {format(transaction.date, 'MMM d, yyyy HH:mm')}
                  </td>
                  <td className="py-4">{transaction.location}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaction.status === 'completed'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}