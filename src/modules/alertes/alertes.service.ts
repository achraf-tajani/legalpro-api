import { Injectable, NotFoundException } from '@nestjs/common';
import { AlertesRepository } from './alertes.repository';
import { CreateAlerteDto } from './dto/create-alerte.dto';
import { UpdateAlerteDto } from './dto/update-alerte.dto';
import { Alerte } from './entities/alerte.entity';

@Injectable()
export class AlertesService {
  constructor(private alertesRepository: AlertesRepository) {}

  async findAll(): Promise<Alerte[]> {
    return this.alertesRepository.findAll({
      orderBy: { column: 'date_creation', ascending: false },
    });
  }

  async findById(id: string): Promise<Alerte> {
    const alerte = await this.alertesRepository.findById(id);
    if (!alerte) {
      throw new NotFoundException(`Alerte #${id} non trouvée`);
    }
    return alerte;
  }

  async findByDestinataire(avocatId: string): Promise<Alerte[]> {
    return this.alertesRepository.findByDestinataire(avocatId);
  }

  async findNonLues(avocatId: string): Promise<Alerte[]> {
    return this.alertesRepository.findNonLues(avocatId);
  }

  async findByDossier(dossierId: string): Promise<Alerte[]> {
    return this.alertesRepository.findByDossier(dossierId);
  }

  async findUpcoming(days: number = 7): Promise<Alerte[]> {
    return this.alertesRepository.findUpcoming(days);
  }

  async countNonLues(avocatId: string): Promise<number> {
    return this.alertesRepository.countNonLues(avocatId);
  }

  async create(createAlerteDto: CreateAlerteDto): Promise<Alerte> {
    return this.alertesRepository.create({
      ...createAlerteDto,
      date_creation: new Date().toISOString(),
    });
  }

  async update(id: string, updateAlerteDto: UpdateAlerteDto): Promise<Alerte> {
    const alerte = await this.alertesRepository.findById(id);
    if (!alerte) {
      throw new NotFoundException(`Alerte #${id} non trouvée`);
    }

    return this.alertesRepository.update(id, updateAlerteDto);
  }

  async markAsRead(id: string): Promise<Alerte> {
    return this.update(id, { statut: 'lue' });
  }

  async markAllAsRead(avocatId: string): Promise<void> {
    const nonLues = await this.alertesRepository.findNonLues(avocatId);
    for (const alerte of nonLues) {
      await this.alertesRepository.update(alerte.id, { statut: 'lue' });
    }
  }

  async archive(id: string): Promise<Alerte> {
    return this.update(id, { statut: 'archivée' });
  }

  async delete(id: string): Promise<boolean> {
    const alerte = await this.alertesRepository.findById(id);
    if (!alerte) {
      throw new NotFoundException(`Alerte #${id} non trouvée`);
    }

    return this.alertesRepository.delete(id);
  }
}