import { Injectable, NotFoundException } from '@nestjs/common';
import { DossiersRepository } from './dossiers.repository';
import { CreateDossierDto } from './dto/create-dossier.dto';
import { UpdateDossierDto } from './dto/update-dossier.dto';
import { Dossier } from './entities/dossier.entity';

@Injectable()
export class DossiersService {
  constructor(private dossiersRepository: DossiersRepository) {}

  async findAll(): Promise<Dossier[]> {
    return this.dossiersRepository.findWithRelations();
  }

  async findById(id: string): Promise<Dossier> {
    const dossier = await this.dossiersRepository.findByIdWithRelations(id);
    if (!dossier) {
      throw new NotFoundException(`Dossier #${id} non trouvé`);
    }
    return dossier;
  }

  async findByClient(clientId: string): Promise<Dossier[]> {
    return this.dossiersRepository.findByClient(clientId);
  }

  async findByAvocat(avocatId: string): Promise<Dossier[]> {
    return this.dossiersRepository.findByAvocat(avocatId);
  }

  async search(query: string): Promise<Dossier[]> {
    return this.dossiersRepository.search(query);
  }

  async create(createDossierDto: CreateDossierDto): Promise<Dossier> {
    return this.dossiersRepository.create({
      ...createDossierDto,
      date_creation: new Date().toISOString(),
      date_modification: new Date().toISOString(),
    });
  }

  async update(id: string, updateDossierDto: UpdateDossierDto): Promise<Dossier> {
    const dossier = await this.dossiersRepository.findById(id);
    if (!dossier) {
      throw new NotFoundException(`Dossier #${id} non trouvé`);
    }

    return this.dossiersRepository.update(id, {
      ...updateDossierDto,
      date_modification: new Date().toISOString(),
    });
  }

  async delete(id: string): Promise<boolean> {
    const dossier = await this.dossiersRepository.findById(id);
    if (!dossier) {
      throw new NotFoundException(`Dossier #${id} non trouvé`);
    }

    return this.dossiersRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.dossiersRepository.count();
  }

  async countByStatut(statut: string): Promise<number> {
    return this.dossiersRepository.count({ statut });
  }
}