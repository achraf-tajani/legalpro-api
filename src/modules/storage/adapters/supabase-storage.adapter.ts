import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { IStorageAdapter, UploadResult } from '../interfaces/storage.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SupabaseStorageAdapter implements IStorageAdapter {
  private readonly bucket = 'documents';

  constructor(private supabaseService: SupabaseService) {}

  async upload(
    file: Buffer,
    filename: string,
    folder: string,
    mimeType: string,
  ): Promise<UploadResult> {
    const supabase = this.supabaseService.getClient();
    const id = uuidv4();
    const extension = filename.split('.').pop();
    const path = `${folder}/${id}.${extension}`;

    const { data, error } = await supabase.storage
      .from(this.bucket)
      .upload(path, file, {
        contentType: mimeType,
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(this.bucket)
      .getPublicUrl(path);

    return {
      id,
      filename,
      path: data.path,
      url: urlData.publicUrl,
      size: file.length,
      mimeType,
    };
  }

  async download(path: string): Promise<Buffer> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.storage
      .from(this.bucket)
      .download(path);

    if (error) throw error;

    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async delete(path: string): Promise<boolean> {
    const supabase = this.supabaseService.getClient();

    const { error } = await supabase.storage
      .from(this.bucket)
      .remove([path]);

    if (error) throw error;
    return true;
  }

  async getSignedUrl(path: string, expiresIn: number = 3600): Promise<string> {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.storage
      .from(this.bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  }
}