import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';
import type { TacheStatut, TachePriorite } from './create-tache.dto';

export class UpdateTacheDto {
  @IsOptional()
  @IsUUID()
  id_dossier?: string;

  @IsOptional()
  @IsString()
  titre?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['basse', 'normale', 'haute', 'critique'])
  priorite?: TachePriorite;

  @IsOptional()
  @IsEnum(['non_commencée', 'en_cours', 'en_attente', 'complétée', 'annulée'])
  statut?: TacheStatut;

  @IsOptional()
  @IsDateString()
  date_echeance?: string;

  @IsOptional()
  @IsUUID()
  assigne_a?: string;

  @IsOptional()
  @IsNumber()
  progression?: number;

  @IsOptional()
  @IsString()
  tags?: string;
}