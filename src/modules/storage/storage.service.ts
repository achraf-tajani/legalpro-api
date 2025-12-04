import { Injectable } from '@nestjs/common';
import { SupabaseStorageAdapter } from './adapters/supabase-storage.adapter';
import { EncryptionService } from '../encryption/encryption.service';
import { UploadResult } from './interfaces/storage.interface';

@Injectable()
export class StorageService {
  constructor(
    private storageAdapter: SupabaseStorageAdapter,
    private encryptionService: EncryptionService,
  ) {}

  /**
   * Upload un fichier standard
   */
  async upload(
    file: Buffer,
    filename: string,
    folder: string,
    mimeType: string,
  ): Promise<UploadResult> {
    return this.storageAdapter.upload(file, filename, folder, mimeType);
  }

  /**
   * Upload un fichier chiffré (pour documents confidentiels)
   */
  async uploadEncrypted(
    file: Buffer,
    filename: string,
    folder: string,
    mimeType: string,
  ): Promise<UploadResult & { encrypted: true }> {
    // Chiffrer le contenu du fichier
    const encryptedContent = this.encryptionService.encrypt(file.toString('base64'));
    const encryptedBuffer = Buffer.from(encryptedContent, 'utf-8');

    const result = await this.storageAdapter.upload(
      encryptedBuffer,
      `${filename}.encrypted`,
      folder,
      'application/octet-stream',
    );

    return { ...result, encrypted: true };
  }

  /**
   * Télécharge un fichier standard
   */
  async download(path: string): Promise<Buffer> {
    return this.storageAdapter.download(path);
  }

  /**
   * Télécharge et déchiffre un fichier confidentiel
   */
  async downloadEncrypted(path: string): Promise<Buffer> {
    const encryptedBuffer = await this.storageAdapter.download(path);
    const encryptedContent = encryptedBuffer.toString('utf-8');
    const decryptedBase64 = this.encryptionService.decrypt(encryptedContent);
    return Buffer.from(decryptedBase64, 'base64');
  }

  /**
   * Supprime un fichier
   */
  async delete(path: string): Promise<boolean> {
    return this.storageAdapter.delete(path);
  }

  /**
   * Génère une URL signée (accès temporaire)
   */
  async getSignedUrl(path: string, expiresIn: number = 3600): Promise<string> {
    return this.storageAdapter.getSignedUrl(path, expiresIn);
  }
}