import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(private notesRepository: NotesRepository) {}

  async findAll(): Promise<Note[]> {
    return this.notesRepository.findAll({
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findById(id: string): Promise<Note> {
    const note = await this.notesRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note #${id} non trouvée`);
    }
    return note;
  }

  async findByDossier(dossierId: string): Promise<Note[]> {
    return this.notesRepository.findByDossier(dossierId);
  }

  async findPubliques(): Promise<Note[]> {
    return this.notesRepository.findPubliques();
  }

  async findByCategorie(categorie: string): Promise<Note[]> {
    return this.notesRepository.findByCategorie(categorie);
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesRepository.create({
      ...createNoteDto,
      date_creation: new Date().toISOString(),
      date_modification: new Date().toISOString(),
    });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.notesRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note #${id} non trouvée`);
    }

    return this.notesRepository.update(id, {
      ...updateNoteDto,
      date_modification: new Date().toISOString(),
    });
  }

  async delete(id: string): Promise<boolean> {
    const note = await this.notesRepository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note #${id} non trouvée`);
    }

    return this.notesRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.notesRepository.count();
  }
}