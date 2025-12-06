import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';

export type TacheStatut = 'not_started' | 'in_progress' | 'pending' | 'completed' | 'cancelled';
export type TachePriorite = 'low' | 'normal' | 'high' | 'critical';

export class CreateTacheDto {
  @IsUUID()
  id_dossier: string;

  @IsString()
  titre: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'critical'])
  priorite?: TachePriorite = 'normal';

  @IsOptional()
  @IsEnum(['not_started', 'in_progress', 'pending', 'completed', 'cancelled'])
  statut?: TacheStatut = 'not_started';

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