import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';

export type ProcedureStatut = 'programmée' | 'en_cours' | 'reportée' | 'complétée' | 'annulée';
export type ProcedurePriorite = 'basse' | 'normale' | 'haute' | 'critique';

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
  @IsEnum(['programmée', 'en_cours', 'reportée', 'complétée', 'annulée'])
  statut?: ProcedureStatut = 'programmée';

  @IsOptional()
  @IsEnum(['basse', 'normale', 'haute', 'critique'])
  priorite?: ProcedurePriorite = 'normale';

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