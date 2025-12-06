import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';
import type { ProcedureStatut, ProcedurePriorite } from './create-procedure.dto';

export class UpdateProcedureDto {
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
  @IsDateString()
  date_completion?: string;

  @IsOptional()
  @IsEnum(['scheduled', 'in_progress', 'postponed', 'completed', 'cancelled'])
  statut?: ProcedureStatut;

  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'critical'])
  priorite?: ProcedurePriorite;

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