import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../database/repositories/base.repository';
import { SupabaseService } from '../supabase/supabase.service';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesRepository extends BaseRepository<Note> {
  protected tableName = 'notes';

  constructor(supabaseService: SupabaseService) {
    super(supabaseService);
  }

  async findByDossier(dossierId: string): Promise<Note[]> {
    return this.findAll({
      filters: { id_dossier: dossierId },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findPubliques(): Promise<Note[]> {
    return this.findAll({
      filters: { est_publique: true },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findByCategorie(categorie: string): Promise<Note[]> {
    return this.findAll({
      filters: { categorie },
      orderBy: { column: 'date_creation', ascending: false },
    });
  }
}