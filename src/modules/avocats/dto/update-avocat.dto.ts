import { IsString, IsOptional, IsEnum, IsEmail, IsNumber } from 'class-validator';
import type { AvocatStatut } from './create-avocat.dto';

export class UpdateAvocatDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  numero_barreau?: string;

  @IsOptional()
  @IsString()
  specialite?: string;

  @IsOptional()
  @IsEnum(['actif', 'inactif', 'suspendu'])
  statut?: AvocatStatut;

  @IsOptional()
  @IsNumber()
  tarif_horaire?: number;

  @IsOptional()
  @IsString()
  cabinet?: string;
}