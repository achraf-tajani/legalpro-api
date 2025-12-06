import { IsString, IsOptional, IsEnum, IsNumber, IsUUID } from 'class-validator';

export type DossierStatut = 'ouvert' | 'en_cours' | 'suspendu' | 'clos' | 'archive';
export type DossierPriorite = 'basse' | 'normale' | 'haute' | 'critique';
export type DossierConfidentialite = 'public' | 'prive' | 'confidentiel';

export class CreateDossierDto {
  @IsString()
  titre: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  domaine?: string;

  @IsOptional()
  @IsEnum(['ouvert', 'en_cours', 'suspendu', 'clos', 'archive'])
  statut?: DossierStatut = 'ouvert';

  @IsOptional()
  @IsEnum(['basse', 'normale', 'haute', 'critique'])
  priorite?: DossierPriorite = 'normale';

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
  confidentialite?: DossierConfidentialite = 'confidentiel';

  @IsOptional()
  @IsUUID('all')
  avocat_assigne?: string;

  @IsUUID('all')
  id_client: string;
}