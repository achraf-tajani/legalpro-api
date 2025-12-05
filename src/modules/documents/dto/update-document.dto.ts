import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import type { DocumentStatut, DocumentConfidentialite } from './create-document.dto';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  nom?: string;

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
  statut?: DocumentStatut;

  @IsOptional()
  @IsEnum(['public', 'interne', 'confidentiel', 'secret'])
  niveau_confidentialite?: DocumentConfidentialite;

  @IsOptional()
  @IsBoolean()
  est_template?: boolean;
}