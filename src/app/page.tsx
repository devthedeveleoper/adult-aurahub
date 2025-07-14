import VideoCard from '@/components/VideoCard';

interface File {
  name: string;
  linkid: string;
  link: string;
}

export default async function HomePage() {
  const res = await fetch(`/api/files`, {
    cache: 'no-store',
  });
  const data = await res.json();

  const files: File[] = data?.result?.files || [];

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Streamtape Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file) => (
          <VideoCard key={file.linkid} {...file} />
        ))}
      </div>
    </main>
  );
}
