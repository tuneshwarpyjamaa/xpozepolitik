'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface PerformanceMetrics {
  attendance_percentage: string;
  questions_asked: string;
  mplads_fund_utilization: string;
}

interface Assets {
  movable: string;
  immovable: string;
  liabilities: string;
}

interface MP {
  id: string;
  name: string;
  party: string;
  constituency: string;
  house: string;
  profile_image_url: string;
  performance_metrics: PerformanceMetrics;
  net_worth: string;
  assets: Assets;
  education: string;
  criminal_cases: string;
  businesses: string;
  complete_history: string;
  controversies: string;
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
        <header className="mb-12">
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            &larr; Back to Directory
          </Link>
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={mp.profile_image_url}
                alt={mp.name}
                className="w-48 h-48 rounded-full object-cover mb-4"
              />
              <h1 className="text-3xl font-bold text-center">{mp.name}</h1>
              <p className="text-lg mt-2 text-center">
                {mp.party} | {mp.constituency} ({mp.house})
              </p>
              
              <div className="mt-6 w-full bg-gray-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Financial Details</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Net Worth:</span> {mp.net_worth}</p>
                  <p><span className="font-medium">Movable Assets:</span> {mp.assets.movable}</p>
                  <p><span className="font-medium">Immovable Assets:</span> {mp.assets.immovable}</p>
                  <p><span className="font-medium">Liabilities:</span> {mp.assets.liabilities}</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 space-y-8">
              {/* Performance Metrics */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">Attendance</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-blue-600 h-4 rounded-full text-xs text-white flex items-center justify-center"
                        style={{ width: mp.performance_metrics.attendance_percentage }}
                      >
                        {mp.performance_metrics.attendance_percentage}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Questions Asked</h3>
                    <p className="text-3xl font-bold mt-2">
                      {mp.performance_metrics.questions_asked}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">MPLADS Fund Utilization</h3>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className="bg-green-600 h-4 rounded-full text-xs text-white flex items-center justify-center"
                        style={{ width: mp.performance_metrics.mplads_fund_utilization }}
                      >
                        {mp.performance_metrics.mplads_fund_utilization}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Education and Background */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Education & Background</h2>
                <p className="mb-4"><span className="font-medium">Education:</span> {mp.education}</p>
                <p className="text-red-600 font-medium">Criminal Cases: {mp.criminal_cases}</p>
                <p className="mt-4"><span className="font-medium">Business Interests:</span> {mp.businesses}</p>
              </div>
              
              {/* Complete History */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Political Journey</h2>
                <p className="whitespace-pre-line">{mp.complete_history}</p>
              </div>
              
              {/* Controversies */}
              {mp.controversies && (
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h2 className="text-2xl font-bold text-red-700 mb-4">Controversies</h2>
                  <p className="text-red-800 whitespace-pre-line">{mp.controversies}</p>
                </div>
              )}
            </div>
          </div>
        </header>
      </main>
    </div>
  );
}
