'use client';

import { useState, useEffect } from 'react';
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMps.map((mp) => (
            <Link href={`/mps/${mp.id}`} key={mp.id}>
              <div className="block border border-gray-200 rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300">
                <img
                  src={mp.profile_image_url}
                  alt={mp.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold">{mp.name}</h2>
                <p className="text-gray-600">{mp.party}</p>
                <p className="text-gray-600">{mp.constituency}</p>
                <p className="text-gray-600">{mp.house}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
