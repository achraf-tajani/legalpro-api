import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsRepository extends BaseRepository<Document> {
  protected tableName = 'document';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByDossier(dossierId: string): Promise<Document[]> {
    return this.findAll({
      filters: { id_dossier: dossierId },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findByCategorie(categorie: string): Promise<Document[]> {
    return this.findAll({
      filters: { categorie },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findTemplates(): Promise<Document[]> {
    return this.findAll({
      filters: { est_template: true },
      orderBy: { column: 'nom', ascending: true },
    });
  }

  async findWithDossier(): Promise<Document[]> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*, dossier:dossier!id_dossier(id, titre, reference)')
      .order('date_creation', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}