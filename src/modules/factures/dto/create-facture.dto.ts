// src/modules/factures/dto/create-facture.dto.ts
import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsDateString } from 'class-validator';

export type FactureStatut = 'brouillon' | 'envoyee' | 'payee' | 'en_retard' | 'annulee';

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
  taux_tva?: number;

  @IsOptional()
  @IsNumber()
  reduction?: number;

  @IsOptional()
  @IsDateString()
  date_echeance?: string;

  @IsOptional()
  @IsEnum(['brouillon', 'envoyee', 'payee', 'en_retard', 'annulee'])
  statut?: FactureStatut;

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