import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';

export type TacheStatut = 'non_commencée' | 'en_cours' | 'en_attente' | 'complétée' | 'annulée';
export type TachePriorite = 'basse' | 'normale' | 'haute' | 'critique';

export class CreateTacheDto {
  @IsUUID()
  id_dossier: string;

  @IsString()
  titre: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['basse', 'normale', 'haute', 'critique'])
  priorite?: TachePriorite = 'normale';

  @IsOptional()
  @IsEnum(['non_commencée', 'en_cours', 'en_attente', 'complétée', 'annulée'])
  statut?: TacheStatut = 'non_commencée';

  @IsOptional()
  @IsDateString()
  date_echeance?: string;

  @IsOptional()
  @IsUUID()
  assigne_a?: string;

  @IsOptional()
  @IsNumber()
  progression?: number = 0;

  @IsOptional()
  @IsString()
  tags?: string;
}