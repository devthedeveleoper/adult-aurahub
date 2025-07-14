'use client';

import { useState } from 'react';
import VideoCard from './VideoCard';

interface File {
  name: string;
  linkid: string;
  link: string;
}

export default function VideoGallery({ files }: { files: File[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoading(false);
    }, 500); // 500ms debounce
  };

  const visibleFiles = files.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {visibleFiles.map((file) => (
          <VideoCard key={file.linkid} {...file} />
        ))}
      </div>

      {visibleCount < files.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`bg-black text-white px-6 py-2 rounded-xl transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
}
