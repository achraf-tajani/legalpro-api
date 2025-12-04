import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { SupabaseStorageAdapter } from './adapters/supabase-storage.adapter';

@Global()
@Module({
  providers: [StorageService, SupabaseStorageAdapter],
  exports: [StorageService],
})
export class StorageModule {}