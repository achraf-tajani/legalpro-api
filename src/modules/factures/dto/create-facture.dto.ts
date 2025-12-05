import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';

export type FactureStatut = 'brouillon' | 'envoyée' | 'payée' | 'en_retard' | 'annulée';

export class CreateFactureDto {
  @IsUUID()
  id_dossier: string;

  @IsUUID()
  id_client: string;

  @IsString()
  numero: string;

  @IsNumber()
  montant_ht: number;

  @IsOptional()
  @IsNumber()
  taux_tva?: number = 20;

  @IsOptional()
  @IsNumber()
  reduction?: number = 0;

  @IsOptional()
  @IsDateString()
  date_echeance?: string;

  @IsOptional()
  @IsEnum(['brouillon', 'envoyée', 'payée', 'en_retard', 'annulée'])
  statut?: FactureStatut = 'brouillon';

  @IsOptional()
  @IsString()
  methode_facturation?: string;

  @IsOptional()
  @IsString()
  mode_paiement?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  conditions?: string;
}