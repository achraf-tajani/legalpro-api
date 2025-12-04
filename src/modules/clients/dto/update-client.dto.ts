import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import type { ClientType, ClientStatut } from './create-client.dto';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsEnum(['personne_physique', 'entreprise', 'organisation'])
  type_client?: ClientType;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsString()
  code_postal?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  pays?: string;

  @IsOptional()
  @IsEnum(['actif', 'inactif', 'suspendu'])
  statut?: ClientStatut;

  @IsOptional()
  @IsString()
  type_entite?: string;
}