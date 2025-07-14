import React, { useEffect, useState } from 'react';

const FALLBACK_IMAGE = '/fallback.gif'; // Place fallback.jpg inside public/

export default function VideoCard({ video, refProp }) {
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    const cached = localStorage.getItem(`thumb_${video.linkid}`);
    if (cached) {
      setThumbnail(cached);
    } else {
      fetch(`https://adult-aurahub.onrender.com/api/thumbnail?file=${video.linkid}`)
        .then((res) => res.json())
        .then((data) => {
          const url = data?.result;
          setThumbnail(url);
          localStorage.setItem(`thumb_${video.linkid}`, url);
        })
        .catch(() => setThumbnail(FALLBACK_IMAGE));
    }
  }, [video.linkid]);

  return (
    <div ref={refProp} className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={thumbnail || FALLBACK_IMAGE}
        alt={video.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{video.name}</h2>
        <a
          href={video.link}
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-2 text-sm text-blue-600 hover:underline"
        >
          Watch Video
        </a>
      </div>
    </div>
  );
}
