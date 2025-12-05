import { Injectable, NotFoundException } from '@nestjs/common';
import { FacturesRepository } from './factures.repository';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { Facture } from './entities/facture.entity';

@Injectable()
export class FacturesService {
  constructor(private facturesRepository: FacturesRepository) {}

  async findAll(): Promise<Facture[]> {
    return this.facturesRepository.findWithRelations();
  }

  async findById(id: string): Promise<Facture> {
    const facture = await this.facturesRepository.findById(id);
    if (!facture) {
      throw new NotFoundException(`Facture #${id} non trouvée`);
    }
    return facture;
  }

  async findByDossier(dossierId: string): Promise<Facture[]> {
    return this.facturesRepository.findByDossier(dossierId);
  }

  async findByClient(clientId: string): Promise<Facture[]> {
    return this.facturesRepository.findByClient(clientId);
  }

  async findByStatut(statut: string): Promise<Facture[]> {
    return this.facturesRepository.findByStatut(statut);
  }

  async findUnpaid(): Promise<Facture[]> {
    return this.facturesRepository.findUnpaid();
  }

  async create(createFactureDto: CreateFactureDto): Promise<Facture> {
    const montantHt = createFactureDto.montant_ht;
    const tauxTva = createFactureDto.taux_tva || 20;
    const reduction = createFactureDto.reduction || 0;
    const montantTtc = (montantHt - reduction) * (1 + tauxTva / 100);

    return this.facturesRepository.create({
      ...createFactureDto,
      montant_ttc: Math.round(montantTtc * 100) / 100,
      taux_tva: tauxTva,
      reduction,
      montant_paye: 0,
      date_emission: new Date().toISOString(),
    });
  }

  async update(id: string, updateFactureDto: UpdateFactureDto): Promise<Facture> {
    const facture = await this.facturesRepository.findById(id);
    if (!facture) {
      throw new NotFoundException(`Facture #${id} non trouvée`);
    }

    // Recalculer TTC si montant HT ou TVA changent
    let montantTtc = facture.montant_ttc;
    if (updateFactureDto.montant_ht || updateFactureDto.taux_tva || updateFactureDto.reduction !== undefined) {
      const montantHt = updateFactureDto.montant_ht || facture.montant_ht;
      const tauxTva = updateFactureDto.taux_tva || facture.taux_tva;
      const reduction = updateFactureDto.reduction !== undefined ? updateFactureDto.reduction : facture.reduction;
      montantTtc = (montantHt - reduction) * (1 + tauxTva / 100);
      montantTtc = Math.round(montantTtc * 100) / 100;
    }

    return this.facturesRepository.update(id, {
      ...updateFactureDto,
      montant_ttc: montantTtc,
    });
  }

  async markAsPaid(id: string, montantPaye?: number): Promise<Facture> {
    const facture = await this.findById(id);
    
    return this.facturesRepository.update(id, {
      statut: 'payée',
      montant_paye: montantPaye || facture.montant_ttc,
      date_paiement: new Date().toISOString(),
    });
  }

  async delete(id: string): Promise<boolean> {
    const facture = await this.facturesRepository.findById(id);
    if (!facture) {
      throw new NotFoundException(`Facture #${id} non trouvée`);
    }

    return this.facturesRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.facturesRepository.count();
  }

  async getTotalRevenue(): Promise<number> {
    const factures = await this.facturesRepository.findByStatut('payée');
    return factures.reduce((sum, f) => sum + (f.montant_paye || 0), 0);
  }

  async getTotalUnpaid(): Promise<number> {
    const factures = await this.facturesRepository.findUnpaid();
    return factures.reduce((sum, f) => sum + (f.montant_ttc - (f.montant_paye || 0)), 0);
  }
}