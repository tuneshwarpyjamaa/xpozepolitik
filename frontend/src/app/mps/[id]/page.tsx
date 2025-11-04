'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface PerformanceMetrics {
  attendance_percentage: number;
  questions_asked: number;
  mplads_fund_utilization: number | null;
}

interface MP {
  id: string;
  name: string;
  party: string;
  constituency: string;
  house: string;
  profile_image_url: string;
  performance_metrics: PerformanceMetrics;
}

const ProgressBar = ({ label, value }: { label: string; value: number | null }) => (
  <div>
    <h3 className="text-lg font-semibold">{label}</h3>
    <div className="w-full bg-gray-200 rounded-full h-6 mt-2">
      <div
        className="bg-black h-6 rounded-full text-white text-center leading-6"
        style={{ width: `${value}%` }}
      >
        {value !== null ? `${value}%` : 'N/A'}
      </div>
    </div>
  </div>
);

export default function MPProfile() {
  const [mp, setMp] = useState<MP | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`/api/mps/${id}`)
        .then((res) => res.json())
        .then((data) => setMp(data));
    }
  }, [id]);

  if (!mp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-12">
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            &larr; Back to Directory
          </Link>
          <img
            src={mp.profile_image_url}
            alt={mp.name}
            className="w-48 h-48 rounded-full mx-auto my-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold">{mp.name}</h1>
          <p className="text-xl mt-2">
            {mp.party} | {mp.constituency} ({mp.house})
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Performance Dashboard</h2>
          <div className="space-y-6">
            <ProgressBar
              label="Attendance"
              value={mp.performance_metrics.attendance_percentage}
            />
            <div>
              <h3 className="text-lg font-semibold">Questions Asked</h3>
              <p className="text-4xl font-bold mt-2">
                {mp.performance_metrics.questions_asked}
              </p>
            </div>
            <ProgressBar
              label="MPLADS Fund Utilization"
              value={mp.performance_metrics.mplads_fund_utilization}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
