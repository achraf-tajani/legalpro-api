import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';

export type ProcedureStatut = 'scheduled' | 'in_progress' | 'postponed' | 'completed' | 'cancelled';
export type ProcedurePriorite = 'low' | 'normal' | 'high' | 'critical';

export class CreateProcedureDto {
  @IsUUID()
  id_dossier: string;

  @IsString()
  titre: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  etape?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsDateString()
  date_evenement?: string;

  @IsOptional()
  @IsEnum(['scheduled', 'in_progress', 'postponed', 'completed', 'cancelled'])
  statut?: ProcedureStatut = 'scheduled';

  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'critical'])
  priorite?: ProcedurePriorite = 'normal';

  @IsOptional()
  @IsString()
  tribunal?: string;

  @IsOptional()
  @IsString()
  juge_assigne?: string;

  @IsOptional()
  @IsString()
  salle?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsNumber()
  frais_associes?: number;
}