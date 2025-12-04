import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Dossier } from './entities/dossier.entity';

@Injectable()
export class DossiersRepository extends BaseRepository<Dossier> {
  protected tableName = 'dossier';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByClient(clientId: string): Promise<Dossier[]> {
    return this.findAll({
      filters: { id_client: clientId },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findByAvocat(avocatId: string): Promise<Dossier[]> {
    return this.findAll({
      filters: { avocat_assigne: avocatId },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findWithRelations(): Promise<Dossier[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        client:client!id_client(id, nom, prenom, email),
        avocat:avocat!avocat_assigne(id, nom, prenom)
      `)
      .order('date_creation', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async findByIdWithRelations(id: string): Promise<Dossier | null> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        client:client!id_client(id, nom, prenom, email, telephone),
        avocat:avocat!avocat_assigne(id, nom, prenom, email)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  async search(query: string): Promise<Dossier[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .or(`titre.ilike.%${query}%,reference.ilike.%${query}%,description.ilike.%${query}%`)
      .order('date_creation', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}