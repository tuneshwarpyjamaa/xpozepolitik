'use client';

import { useState } from 'react';

export default function AdminUpload() {
  const [apiKey, setApiKey] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!file) {
      setMessage('Please select a file to upload.');
      setIsError(true);
      return;
    }

    if (!apiKey) {
      setMessage('Please enter the API Key.');
      setIsError(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Something went wrong');
      }

      setMessage(data.message || 'Upload successful!');
      setIsError(false);
      setFile(null);
      // Clear the file input visually
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
          fileInput.value = '';
      }

    } catch (error: any) {
      setMessage(`Upload failed: ${error.message}`);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center">
      <main className="container mx-auto p-8 max-w-lg">
        <div className="border border-gray-200 rounded-lg p-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold">Admin Data Upload</h1>
            <p className="text-gray-600 mt-2">
              Upload the quarterly MP data JSON file.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700"
              >
                Password (API Key)
              </label>
              <input
                type="password"
                id="apiKey"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700"
              >
                JSON File
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".json"
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-black file:text-white
                  hover:file:bg-gray-800"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
            >
              Upload Data
            </button>
          </form>

          {message && (
            <div
              className={`mt-6 p-4 rounded-md text-center ${
                isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
