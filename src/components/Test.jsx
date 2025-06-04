import React, { useState } from 'react';

const LinkedInViewer = () => {
  const [url, setUrl] = useState('');

  const openProfile = () => {
    const trimmedUrl = url.trim();
    if (trimmedUrl && trimmedUrl.startsWith('https://www.linkedin.com/in/')) {
      window.open(trimmedUrl, '_blank');
    } else {
      alert('Please enter a valid LinkedIn profile URL.');
    }
  };

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">View LinkedIn Profile</h1>
        <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter LinkedIn profile URL"
            className="w-80 p-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            onClick={openProfile}
            className="w-80 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200"
        >
          Open Profile
        </button>
      </div>
  );
};

export default LinkedInViewer;
