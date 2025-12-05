import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import type { AlertePriorite, AlerteStatut } from './create-alerte.dto';

export class UpdateAlerteDto {
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
  @IsDateString()
  date_echeance?: string;

  @IsOptional()
  @IsEnum(['basse', 'normale', 'haute', 'critique'])
  priorite?: AlertePriorite;

  @IsOptional()
  @IsEnum(['non_lue', 'lue', 'archivée'])
  statut?: AlerteStatut;

  @IsOptional()
  @IsString()
  moyen_notification?: string;
}