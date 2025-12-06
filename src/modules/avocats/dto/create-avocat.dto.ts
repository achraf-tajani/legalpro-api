import { IsString, IsOptional, IsEnum, IsEmail, IsNumber, IsUUID } from 'class-validator';

export type AvocatStatut = 'actif' | 'inactif' | 'suspendu';

export class CreateAvocatDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsString()
  numero_barreau: string;

  @IsOptional()
  @IsString()
  specialite?: string;

  @IsOptional()
  @IsEnum(['actif', 'inactif', 'suspendu'])
  statut?: AvocatStatut = 'actif';

  @IsOptional()
  @IsNumber()
  tarif_horaire?: number;

  @IsOptional()
  @IsString()
  cabinet?: string;
}