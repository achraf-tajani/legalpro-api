import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Avocat } from './entities/avocat.entity';

@Injectable()
export class AvocatsRepository extends BaseRepository<Avocat> {
  protected tableName = 'avocat';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByUserId(userId: string): Promise<Avocat | null> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  async findActifs(): Promise<Avocat[]> {
    return this.findAll({
      filters: { statut: 'actif' },
      orderBy: { column: 'nom', ascending: true },
    });
  }

  async findBySpecialite(specialite: string): Promise<Avocat[]> {
    return this.findAll({
      filters: { specialite },
      orderBy: { column: 'nom', ascending: true },
    });
  }

  async search(query: string): Promise<Avocat[]> {
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