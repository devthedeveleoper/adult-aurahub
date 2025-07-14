export interface StreamtapeFolder {
  id: string;
  name: string;
}

export interface StreamtapeFile {
  name: string;
  size: number;
  link: string;
  created_at: number;
  downloads: number;
  linkid: string;
  convert: string;
}

export interface ListFolderResponse {
  status: number;
  msg: string;
  result: {
    folders: StreamtapeFolder[];
    files: StreamtapeFile[];
  };
}

export interface ThumbnailResponse {
  status: number;
  msg: string;
  result: string;
}
