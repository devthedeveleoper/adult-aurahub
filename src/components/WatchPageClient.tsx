'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StreamtapeFile } from '@/types/streamtape';
import VideoPlayer from '@/components/VideoPlayer';
import Link from 'next/link';

export default function WatchPageClient() {
  const { id } = useParams();
  const [videos, setVideos] = useState<StreamtapeFile[]>([]);
  const [currentVideo, setCurrentVideo] = useState<StreamtapeFile | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch('/api/streamtape/list-folder');
      const json = await res.json();
      const files: StreamtapeFile[] = json.result?.files || [];

      setVideos(files);
      setCurrentVideo(files.find((f) => f.linkid === id) || null);
    }

    fetchVideos();
  }, [id]);

  if (!id) return <p>Loading...</p>;
  if (!currentVideo) return <p>Video not found.</p>;

  const moreVideos = videos.filter((v) => v.linkid !== id).slice(0, 6);

  return (
    <div className="px-4 py-6">
      <VideoPlayer video={currentVideo} />

      <h2 className="text-lg font-semibold mt-8 mb-2">More Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {moreVideos.map((file) => (
          <Link key={file.linkid} href={`/watch/${file.linkid}`}>
            <div className="aspect-video bg-gray-200 rounded shadow flex items-center justify-center">
              <span className="text-sm text-gray-600">Thumbnail</span>
            </div>
            <p className="text-sm mt-1 truncate">{file.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
