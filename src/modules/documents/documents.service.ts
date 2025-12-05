import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentsRepository } from './documents.repository';
import { StorageService } from '../storage/storage.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    private documentsRepository: DocumentsRepository,
    private storageService: StorageService,
  ) {}

  async findAll(): Promise<Document[]> {
    return this.documentsRepository.findWithDossier();
  }

  async findById(id: string): Promise<Document> {
    const document = await this.documentsRepository.findById(id);
    if (!document) {
      throw new NotFoundException(`Document #${id} non trouvé`);
    }
    return document;
  }

  async findByDossier(dossierId: string): Promise<Document[]> {
    return this.documentsRepository.findByDossier(dossierId);
  }

  async findByCategorie(categorie: string): Promise<Document[]> {
    return this.documentsRepository.findByCategorie(categorie);
  }

  async findTemplates(): Promise<Document[]> {
    return this.documentsRepository.findTemplates();
  }

  async upload(
    file: Buffer,
    filename: string,
    mimeType: string,
    createDocumentDto: CreateDocumentDto,
  ): Promise<Document> {
    const isConfidential = 
      createDocumentDto.niveau_confidentialite === 'confidentiel' ||
      createDocumentDto.niveau_confidentialite === 'secret';

    // Upload fichier (chiffré si confidentiel)
    const uploadResult = isConfidential
      ? await this.storageService.uploadEncrypted(
          file,
          filename,
          `dossiers/${createDocumentDto.id_dossier}`,
          mimeType,
        )
      : await this.storageService.upload(
          file,
          filename,
          `dossiers/${createDocumentDto.id_dossier}`,
          mimeType,
        );

    // Créer l'entrée en DB
    const document = await this.documentsRepository.create({
      ...createDocumentDto,
      nom: filename,
      format: mimeType,
      chemin_local: uploadResult.path,
      url_cloud: uploadResult.url,
      taille_mo: uploadResult.size / (1024 * 1024),
      version: 1,
      est_chiffre: isConfidential,
      date_creation: new Date().toISOString(),
      date_modification: new Date().toISOString(),
    });

    return document;
  }

  async download(id: string): Promise<{ buffer: Buffer; document: Document }> {
    const document = await this.findById(id);

    if (!document.chemin_local) {
      throw new NotFoundException('Fichier non trouvé');
    }

    const buffer = document.est_chiffre
      ? await this.storageService.downloadEncrypted(document.chemin_local)
      : await this.storageService.download(document.chemin_local);

    return { buffer, document };
  }

  async getSignedUrl(id: string): Promise<string> {
    const document = await this.findById(id);

    if (!document.chemin_local) {
      throw new NotFoundException('Fichier non trouvé');
    }

    return this.storageService.getSignedUrl(document.chemin_local);
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    const document = await this.documentsRepository.findById(id);
    if (!document) {
      throw new NotFoundException(`Document #${id} non trouvé`);
    }

    return this.documentsRepository.update(id, {
      ...updateDocumentDto,
      date_modification: new Date().toISOString(),
    });
  }

  async delete(id: string): Promise<boolean> {
    const document = await this.documentsRepository.findById(id);
    if (!document) {
      throw new NotFoundException(`Document #${id} non trouvé`);
    }

    // Supprimer le fichier du storage
    if (document.chemin_local) {
      await this.storageService.delete(document.chemin_local);
    }

    return this.documentsRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.documentsRepository.count();
  }
}