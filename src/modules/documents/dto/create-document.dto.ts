import { IsString, IsOptional, IsEnum, IsNumber, IsUUID, IsBoolean } from 'class-validator';

export type DocumentStatut = 'brouillon' | 'validé' | 'archivé' | 'supprimé';
export type DocumentConfidentialite = 'public' | 'interne' | 'confidentiel' | 'secret';

export class CreateDocumentDto {
  @IsUUID()
  id_dossier: string;

  @IsString()
  nom: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  categorie?: string;

  @IsOptional()
  @IsEnum(['brouillon', 'validé', 'archivé', 'supprimé'])
  statut?: DocumentStatut = 'brouillon';

  @IsOptional()
  @IsEnum(['public', 'interne', 'confidentiel', 'secret'])
  niveau_confidentialite?: DocumentConfidentialite = 'confidentiel';

  @IsOptional()
  @IsBoolean()
  est_template?: boolean = false;

  @IsOptional()
  @IsString()
  auteur?: string;
}