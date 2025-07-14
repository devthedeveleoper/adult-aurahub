'use client';

import { useStreamtapeList } from '@/hooks/useStreamtape';
import type { StreamtapeFile, StreamtapeFolder } from '@/types/streamtape';

export default function HomePage() {
  const { folders, files, isLoading, isError } = useStreamtapeList();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load data</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Folders</h2>
      <ul>
        {folders.map((f: StreamtapeFolder) => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-4">Files</h2>
      <ul>
        {files.map((f: StreamtapeFile) => (
          <li key={f.linkid}>{f.name}</li>
        ))}
      </ul>
    </div>
  );
}
