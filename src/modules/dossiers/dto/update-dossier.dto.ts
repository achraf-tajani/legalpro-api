import { IsString, IsOptional, IsEnum, IsNumber, IsUUID } from 'class-validator';
import type { DossierStatut, DossierPriorite, DossierConfidentialite } from './create-dossier.dto';

export class UpdateDossierDto {
  @IsOptional()
  @IsString()
  titre?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  domaine?: string;

  @IsOptional()
  @IsEnum(['ouvert', 'en_cours', 'suspendu', 'clos', 'archivé'])
  statut?: DossierStatut;

  @IsOptional()
  @IsEnum(['basse', 'normale', 'haute', 'critique'])
  priorite?: DossierPriorite;

  @IsOptional()
  @IsNumber()
  montant_en_jeu?: number;

  @IsOptional()
  @IsString()
  tribunal?: string;

  @IsOptional()
  @IsString()
  reference?: string;

  @IsOptional()
  @IsEnum(['public', 'prive', 'confidentiel'])
  confidentialite?: DossierConfidentialite;

  @IsOptional()
  @IsUUID()
  avocat_assigne?: string;

  @IsOptional()
  @IsUUID()
  id_client?: string;
}