'use client';

import { StreamtapeFile } from '@/types/streamtape';

export default function VideoPlayer({ video }: { video: StreamtapeFile }) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{video.name}</h1>
      <video
        controls
        className="w-full aspect-video rounded shadow-md"
        poster={`https://thumb.tapecontent.net/thumb/${video.linkid}/thumb.jpg`}
      >
        <source src={video.link} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
