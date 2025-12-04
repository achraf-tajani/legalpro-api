import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { EncryptionService } from '../encryption/encryption.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    private clientsRepository: ClientsRepository,
    private encryptionService: EncryptionService,
  ) {}

  async findAll(): Promise<Client[]> {
    const clients = await this.clientsRepository.findAll({
      orderBy: { column: 'nom', ascending: true },
    });
    return clients.map((client) => this.decryptSensitiveData(client));
  }

  async findActifs(): Promise<Client[]> {
    const clients = await this.clientsRepository.findActifs();
    return clients.map((client) => this.decryptSensitiveData(client));
  }

  async findById(id: string): Promise<Client> {
    const client = await this.clientsRepository.findById(id);
    if (!client) {
      throw new NotFoundException(`Client #${id} non trouvé`);
    }
    return this.decryptSensitiveData(client);
  }

  async search(query: string): Promise<Client[]> {
    const clients = await this.clientsRepository.search(query);
    return clients.map((client) => this.decryptSensitiveData(client));
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const encryptedData = this.encryptSensitiveData(createClientDto);
    const client = await this.clientsRepository.create({
      ...encryptedData,
      date_inscription: new Date().toISOString(),
      montant_total_facture: 0,
    });
    return this.decryptSensitiveData(client);
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const existing = await this.clientsRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Client #${id} non trouvé`);
    }

    const encryptedData = this.encryptSensitiveData(updateClientDto);
    const client = await this.clientsRepository.update(id, encryptedData);
    return this.decryptSensitiveData(client);
  }

  async delete(id: string): Promise<boolean> {
    const client = await this.clientsRepository.findById(id);
    if (!client) {
      throw new NotFoundException(`Client #${id} non trouvé`);
    }
    return this.clientsRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.clientsRepository.count();
  }

  /**
   * Chiffre les données sensibles avant stockage
   */
  private encryptSensitiveData<T extends { email?: string; telephone?: string }>(
    data: T,
  ): T {
    const encrypted = { ...data };
    
    if (encrypted.email) {
      encrypted.email = this.encryptionService.encrypt(encrypted.email);
    }
    if (encrypted.telephone) {
      encrypted.telephone = this.encryptionService.encrypt(encrypted.telephone);
    }
    
    return encrypted;
  }

  /**
   * Déchiffre les données sensibles après lecture
   */
  private decryptSensitiveData(client: Client): Client {
    const decrypted = { ...client };
    
    try {
      if (decrypted.email && decrypted.email.includes(':')) {
        decrypted.email = this.encryptionService.decrypt(decrypted.email);
      }
      if (decrypted.telephone && decrypted.telephone.includes(':')) {
        decrypted.telephone = this.encryptionService.decrypt(decrypted.telephone);
      }
    } catch (error) {
      // Si déchiffrement échoue, garder la valeur originale (peut-être pas chiffrée)
      console.warn('Decryption failed for client:', client.id);
    }
    
    return decrypted;
  }
}