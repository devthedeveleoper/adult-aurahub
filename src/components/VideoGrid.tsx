import { StreamtapeFile } from '@/types/streamtape';
import { VideoCard } from './VideoCard';

interface Props {
  files: StreamtapeFile[];
}

export function VideoGrid({ files }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {files.map((file) => (
        <VideoCard key={file.linkid} file={file} />
      ))}
    </div>
  );
}
