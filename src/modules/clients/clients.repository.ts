import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsRepository extends BaseRepository<Client> {
  protected tableName = 'client';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findActifs(): Promise<Client[]> {
    return this.findAll({
      filters: { statut: 'actif' },
      orderBy: { column: 'nom', ascending: true },
    });
  }

  async search(query: string): Promise<Client[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .or(`nom.ilike.%${query}%,prenom.ilike.%${query}%,email.ilike.%${query}%`)
      .order('nom', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}