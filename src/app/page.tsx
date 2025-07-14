'use client';

import { useStreamtapeList } from '@/hooks/useStreamtape';
import { VideoGrid } from '@/components/VideoGrid';
import { useState } from 'react';

export default function HomePage() {
  const { files, isLoading, isError } = useStreamtapeList();
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleFiles = files.slice(0, visibleCount);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Latest Videos</h1>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load videos.</p>}

      <VideoGrid files={visibleFiles} />

      {visibleCount < files.length && (
        <button
          className="mt-6 mx-auto block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          onClick={() => setVisibleCount((prev) => prev + 6)}
        >
          Load More
        </button>
      )}
    </>
  );
}
