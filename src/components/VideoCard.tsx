'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface VideoCardProps {
  name: string;
  linkid: string;
  link: string;
}

export default function VideoCard({ name, linkid, link }: VideoCardProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        const res = await fetch(`/api/thumbnail?file=${linkid}`, { cache: 'no-store' });
        const data = await res.json();
        setThumbnailUrl(data);
      } catch (error) {
        console.error('Thumbnail fetch failed', error);
      }
    };

    fetchThumbnail();
  }, [linkid]);

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition p-2">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full h-48 mb-2">
          {thumbnailUrl && (
            <Image
              src={thumbnailUrl}
              alt={name}
              fill
              className="object-cover rounded-lg"
            />
          )}
        </div>
        <CardContent>
          <h3 className="text-md font-semibold truncate">{name}</h3>
        </CardContent>
      </a>
    </Card>
  );
}
