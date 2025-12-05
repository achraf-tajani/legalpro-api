import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Procedure } from './entities/procedure.entity';

@Injectable()
export class ProceduresRepository extends BaseRepository<Procedure> {
  protected tableName = 'procedure';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByDossier(dossierId: string): Promise<Procedure[]> {
    return this.findAll({
      filters: { id_dossier: dossierId },
      orderBy: { column: 'deadline', ascending: true },
    });
  }

  async findUpcoming(days: number = 7): Promise<Procedure[]> {
    const supabase = this.supabaseService.getClient();
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, dossier:dossier!id_dossier(id, titre)')
      .gte('deadline', today.toISOString())
      .lte('deadline', futureDate.toISOString())
      .in('statut', ['programmée', 'en_cours'])
      .order('deadline', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async findWithDossier(): Promise<Procedure[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, dossier:dossier!id_dossier(id, titre, reference)')
      .order('deadline', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}