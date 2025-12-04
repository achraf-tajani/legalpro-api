import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';

export type ClientType = 'personne_physique' | 'entreprise' | 'organisation';
export type ClientStatut = 'actif' | 'inactif' | 'suspendu';

export class CreateClientDto {
  @IsString()
  nom: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsEnum(['personne_physique', 'entreprise', 'organisation'])
  type_client?: ClientType = 'personne_physique';

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
  statut?: ClientStatut = 'actif';

  @IsOptional()
  @IsString()
  type_entite?: string;
}