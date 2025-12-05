import { IsString, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';

export type AlertePriorite = 'basse' | 'normale' | 'haute' | 'critique';
export type AlerteStatut = 'non_lue' | 'lue' | 'archivée';

export class CreateAlerteDto {
  @IsOptional()
  @IsUUID()
  id_dossier?: string;

  @IsOptional()
  @IsUUID()
  id_procedure?: string;

  @IsString()
  titre: string;

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
  priorite?: AlertePriorite = 'normale';

  @IsOptional()
  @IsEnum(['non_lue', 'lue', 'archivée'])
  statut?: AlerteStatut = 'non_lue';

  @IsOptional()
  @IsUUID()
  destinataire?: string;

  @IsOptional()
  @IsString()
  moyen_notification?: string;
}