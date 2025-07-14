import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { ListFolderResponse, ThumbnailResponse } from '@/types/streamtape';

const defaultFolderId = process.env.NEXT_PUBLIC_STREAMTAPE_ROOT_FOLDER ?? '';

export function useStreamtapeList(folder: string = defaultFolderId) {
  const { data, error, isLoading } = useSWR<ListFolderResponse>(
    `/api/streamtape/list-folder?folder=${folder}`,
    fetcher
  );

  return {
    folders: data?.result.folders || [],
    files: data?.result.files || [],
    isLoading,
    isError: !!error,
  };
}

export function useStreamtapeThumbnail(fileId: string) {
  const { data, error, isLoading } = useSWR<ThumbnailResponse>(
    fileId ? `/api/streamtape/thumbnail?file=${fileId}` : null,
    fetcher
  );

  return {
    thumbnailUrl: data?.result || '',
    isLoading,
    isError: !!error,
  };
}
