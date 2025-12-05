import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Facture } from './entities/facture.entity';

@Injectable()
export class FacturesRepository extends BaseRepository<Facture> {
  protected tableName = 'facture';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByDossier(dossierId: string): Promise<Facture[]> {
    return this.findAll({
      filters: { id_dossier: dossierId },
      orderBy: { column: 'date_emission', ascending: false },
    });
  }

  async findByClient(clientId: string): Promise<Facture[]> {
    return this.findAll({
      filters: { id_client: clientId },
      orderBy: { column: 'date_emission', ascending: false },
    });
  }

  async findByStatut(statut: string): Promise<Facture[]> {
    return this.findAll({
      filters: { statut },
      orderBy: { column: 'date_emission', ascending: false },
    });
  }

  async findUnpaid(): Promise<Facture[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, client:client!id_client(id, nom, prenom), dossier:dossier!id_dossier(id, titre)')
      .in('statut', ['envoyée', 'en_retard'])
      .order('date_echeance', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  async findWithRelations(): Promise<Facture[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, client:client!id_client(id, nom, prenom), dossier:dossier!id_dossier(id, titre)')
      .order('date_emission', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}