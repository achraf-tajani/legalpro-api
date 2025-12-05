import { IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import type { FactureStatut } from './create-facture.dto';

export class UpdateFactureDto {
  @IsOptional()
  @IsNumber()
  montant_ht?: number;

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
  @IsEnum(['brouillon', 'envoyée', 'payée', 'en_retard', 'annulée'])
  statut?: FactureStatut;

  @IsOptional()
  @IsString()
  methode_facturation?: string;

  @IsOptional()
  @IsString()
  mode_paiement?: string;

  @IsOptional()
  @IsString()
  moyen_paiement?: string;

  @IsOptional()
  @IsDateString()
  date_paiement?: string;

  @IsOptional()
  @IsNumber()
  montant_paye?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  conditions?: string;
}