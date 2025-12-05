import { Injectable, NotFoundException } from '@nestjs/common';
import { AdversairesRepository } from './adversaires.repository';
import { CreateAdversaireDto } from './dto/create-adversaire.dto';
import { UpdateAdversaireDto } from './dto/update-adversaire.dto';
import { Adversaire } from './entities/adversaire.entity';

@Injectable()
export class AdversairesService {
  constructor(private adversairesRepository: AdversairesRepository) {}

  async findAll(): Promise<Adversaire[]> {
    return this.adversairesRepository.findWithDossier();
  }

  async findById(id: string): Promise<Adversaire> {
    const adversaire = await this.adversairesRepository.findById(id);
    if (!adversaire) {
      throw new NotFoundException(`Adversaire #${id} non trouvé`);
    }
    return adversaire;
  }

  async findByDossier(dossierId: string): Promise<Adversaire[]> {
    return this.adversairesRepository.findByDossier(dossierId);
  }

  async search(query: string): Promise<Adversaire[]> {
    return this.adversairesRepository.search(query);
  }

  async create(createAdversaireDto: CreateAdversaireDto): Promise<Adversaire> {
    return this.adversairesRepository.create({
      ...createAdversaireDto,
      date_ajout: new Date().toISOString(),
    });
  }

  async update(id: string, updateAdversaireDto: UpdateAdversaireDto): Promise<Adversaire> {
    const adversaire = await this.adversairesRepository.findById(id);
    if (!adversaire) {
      throw new NotFoundException(`Adversaire #${id} non trouvé`);
    }

    return this.adversairesRepository.update(id, updateAdversaireDto);
  }

  async delete(id: string): Promise<boolean> {
    const adversaire = await this.adversairesRepository.findById(id);
    if (!adversaire) {
      throw new NotFoundException(`Adversaire #${id} non trouvé`);
    }

    return this.adversairesRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.adversairesRepository.count();
  }
}