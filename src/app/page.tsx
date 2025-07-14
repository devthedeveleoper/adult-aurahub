import VideoGallery from '@/components/VideoGallery';

export default async function HomePage() {
  const res = await fetch(`/api/files`, {
    cache: 'no-store',
  });

  const data = await res.json();
  const files = data?.result?.files || [];

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Streamtape Videos</h1>
      <VideoGallery files={files} />
    </main>
  );
}
