'use client';

import Link from 'next/link';
import { StreamtapeFile } from '@/types/streamtape';

interface Props {
  file: StreamtapeFile;
}

export function VideoCard({ file }: Props) {
  return (
    <Link href={`/watch/${file.linkid}`} className="rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <div className="aspect-video bg-gray-100 flex items-center justify-center text-sm text-gray-500">
        Thumbnail (optional lazy)
      </div>
      <div className="p-2">
        <h3 className="text-sm font-semibold truncate">{file.name}</h3>
        <p className="text-xs text-gray-500">{(file.size / 1_000_000).toFixed(1)} MB</p>
      </div>
    </Link>
  );
}
