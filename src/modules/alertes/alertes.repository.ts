import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Alerte } from './entities/alerte.entity';

@Injectable()
export class AlertesRepository extends BaseRepository<Alerte> {
  protected tableName = 'alerte';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByDestinataire(avocatId: string): Promise<Alerte[]> {
    return this.findAll({
      filters: { destinataire: avocatId },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findNonLues(avocatId: string): Promise<Alerte[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('destinataire', avocatId)
      .eq('statut', 'non_lue')
      .order('priorite', { ascending: false })
      .order('date_creation', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async findByDossier(dossierId: string): Promise<Alerte[]> {
    return this.findAll({
      filters: { id_dossier: dossierId },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findUpcoming(days: number = 7): Promise<Alerte[]> {
    const supabase = this.supabaseService.getClient();
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, dossier:dossier!id_dossier(id, titre)')
      .gte('date_echeance', today.toISOString())
      .lte('date_echeance', futureDate.toISOString())
      .neq('statut', 'archivée')
      .order('date_echeance', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async countNonLues(avocatId: string): Promise<number> {
    const supabase = this.supabaseService.getClient();
    const { count, error } = await supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .eq('destinataire', avocatId)
      .eq('statut', 'non_lue');

    if (error) throw error;
    return count || 0;
  }
}