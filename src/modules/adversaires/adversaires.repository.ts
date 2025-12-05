import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Adversaire } from './entities/adversaire.entity';

@Injectable()
export class AdversairesRepository extends BaseRepository<Adversaire> {
  protected tableName = 'adversaire';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByDossier(dossierId: string): Promise<Adversaire[]> {
    return this.findAll({
      filters: { id_dossier: dossierId },
      orderBy: { column: 'date_ajout', ascending: false },
    });
  }

  async findWithDossier(): Promise<Adversaire[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, dossier:dossier!id_dossier(id, titre, reference)')
      .order('date_ajout', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async search(query: string): Promise<Adversaire[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .or(`nom.ilike.%${query}%,avocat_adverse.ilike.%${query}%,cabinet.ilike.%${query}%`)
      .order('nom', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}