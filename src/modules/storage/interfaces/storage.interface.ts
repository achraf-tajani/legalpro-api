export interface UploadResult {
  id: string;
  filename: string;
  path: string;
  url: string;
  size: number;
  mimeType: string;
}

export interface IStorageAdapter {
  upload(file: Buffer, filename: string, folder: string, mimeType: string): Promise<UploadResult>;
  download(path: string): Promise<Buffer>;
  delete(path: string): Promise<boolean>;
  getSignedUrl(path: string, expiresIn?: number): Promise<string>;
}