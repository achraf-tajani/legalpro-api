import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Tache } from './entities/tache.entity';

@Injectable()
export class TachesRepository extends BaseRepository<Tache> {
  protected tableName = 'tache';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByDossier(dossierId: string): Promise<Tache[]> {
    return this.findAll({
      filters: { id_dossier: dossierId },
      orderBy: { column: 'date_echeance', ascending: true },
    });
  }

  async findByAssigne(avocatId: string): Promise<Tache[]> {
    return this.findAll({
      filters: { assigne_a: avocatId },
      orderBy: { column: 'date_echeance', ascending: true },
    });
  }

  async findByStatut(statut: string): Promise<Tache[]> {
    return this.findAll({
      filters: { statut },
      orderBy: { column: 'date_echeance', ascending: true },
    });
  }

  async findOverdue(): Promise<Tache[]> {
    const supabase = this.supabaseService.getClient();
    const today = new Date().toISOString();

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, dossier:dossier!id_dossier(id, titre)')
      .lt('date_echeance', today)
      .in('statut', ['non_commencée', 'en_cours', 'en_attente'])
      .order('date_echeance', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async findWithRelations(): Promise<Tache[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, dossier:dossier!id_dossier(id, titre), avocat:avocat!assigne_a(id, nom, prenom)')
      .order('date_echeance', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}