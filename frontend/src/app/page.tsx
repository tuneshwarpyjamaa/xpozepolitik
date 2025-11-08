'use client';

import { useState, useEffect } from 'react';
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

export default function Home() {
  const [mps, setMps] = useState<MP[]>([]);
  const [search, setSearch] = useState('');
  const [party, setParty] = useState('');
  const [constituency, setConstituency] = useState('');
  const [house, setHouse] = useState('');

  useEffect(() => {
    fetch('/api/mps')
      .then((res) => res.json())
      .then((data) => setMps(data));
  }, []);

  const parties = [...new Set(mps.map((mp) => mp.party))];
  const constituencies = [...new Set(mps.map((mp) => mp.constituency))];
  const houses = [...new Set(mps.map((mp) => mp.house))];

  const filteredMps = mps.filter((mp) => {
    return (
      mp.name.toLowerCase().includes(search.toLowerCase()) &&
      (party === '' || mp.party === party) &&
      (constituency === '' || mp.constituency === constituency) &&
      (house === '' || mp.house === house)
    );
  });

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Karnataka MP Tracker</h1>
          <p className="text-lg mt-2">
            A non-partisan public directory of Members of Parliament from Karnataka.
          </p>
        </header>

        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="p-2 border border-gray-300 rounded-md col-span-1 md:col-span-1"
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setParty(e.target.value)}
            >
              <option value="">All Parties</option>
              {parties.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setConstituency(e.target.value)}
            >
              <option value="">All Constituencies</option>
              {constituencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              className="p-2 border border-gray-300 rounded-md"
              onChange={(e) => setHouse(e.target.value)}
            >
              <option value="">All Houses</option>
              {houses.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMps.map((mp) => (
            <Link href={`/mps/${mp.id}`} key={mp.id} className="h-full">
              <div className="h-full flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                <div className="p-4 pb-2 flex flex-col items-center">
                  <img
                    src={mp.profile_image_url}
                    alt={mp.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-100 mb-3"
                  />
                  <h2 className="text-lg font-bold text-center text-gray-900 line-clamp-2">{mp.name}</h2>
                  <p className="text-sm text-blue-600 font-medium mt-1">{mp.party}</p>
                </div>
                
                <div className="p-4 pt-0 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-24">Constituency</span>
                      <span className="text-sm text-gray-700 flex-1">{mp.constituency}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-24">House</span>
                      <span className="text-sm text-gray-700">{mp.house}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-24">Net Worth</span>
                      <span className="text-sm text-gray-700">{mp.net_worth}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-xs font-medium text-gray-500 w-24">Education</span>
                      <span className="text-sm text-gray-700 line-clamp-2">{mp.education}</span>
                    </div>
                  </div>
                  
                  {mp.criminal_cases && mp.criminal_cases.toLowerCase() !== 'none' && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-red-500">⚠️ Criminal Cases:</span>
                        <span className="text-xs text-red-600 ml-1 line-clamp-1">{mp.criminal_cases}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
