import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor(private configService: ConfigService) {
    const url = this.configService.get<string>('supabase.url');
    const key = this.configService.get<string>('supabase.anonKey');

    console.log('SUPABASE_URL from env:', process.env.SUPABASE_URL);
    console.log('SUPABASE_ANON_KEY from env:', process.env.SUPABASE_ANON_KEY ? 'EXISTS' : 'MISSING');
    console.log('URL from config:', url);
    console.log('Key from config:', key ? 'EXISTS' : 'MISSING');


    if (!url || !key) {
      throw new Error('Supabase URL or Key missing in configuration');
    }

    this.client = createClient(url, key);
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}