import { Injectable, NotFoundException } from '@nestjs/common';
import { TachesRepository } from './taches.repository';
import { CreateTacheDto } from './dto/create-tache.dto';
import { UpdateTacheDto } from './dto/update-tache.dto';
import { Tache } from './entities/tache.entity';

@Injectable()
export class TachesService {
  constructor(private tachesRepository: TachesRepository) {}

  async findAll(): Promise<Tache[]> {
    return this.tachesRepository.findWithRelations();
  }

  async findById(id: string): Promise<Tache> {
    const tache = await this.tachesRepository.findById(id);
    if (!tache) {
      throw new NotFoundException(`Tâche #${id} non trouvée`);
    }
    return tache;
  }

  async findByDossier(dossierId: string): Promise<Tache[]> {
    return this.tachesRepository.findByDossier(dossierId);
  }

  async findByAssigne(avocatId: string): Promise<Tache[]> {
    return this.tachesRepository.findByAssigne(avocatId);
  }

  async findByStatut(statut: string): Promise<Tache[]> {
    return this.tachesRepository.findByStatut(statut);
  }

  async findOverdue(): Promise<Tache[]> {
    return this.tachesRepository.findOverdue();
  }

  async create(createTacheDto: CreateTacheDto): Promise<Tache> {
    return this.tachesRepository.create({
      ...createTacheDto,
      date_creation: new Date().toISOString(),
    });
  }

  async update(id: string, updateTacheDto: UpdateTacheDto): Promise<Tache> {
    const tache = await this.tachesRepository.findById(id);
    if (!tache) {
      throw new NotFoundException(`Tâche #${id} non trouvée`);
    }

    return this.tachesRepository.update(id, updateTacheDto);
  }

  async delete(id: string): Promise<boolean> {
    const tache = await this.tachesRepository.findById(id);
    if (!tache) {
      throw new NotFoundException(`Tâche #${id} non trouvée`);
    }

    return this.tachesRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.tachesRepository.count();
  }

  async countByStatut(statut: string): Promise<number> {
    return this.tachesRepository.count({ statut });
  }
}