import { IsString, IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class CreateNoteDto {
  @IsUUID()
  id_dossier: string;

  @IsOptional()
  @IsString()
  titre?: string;

  @IsOptional()
  @IsString()
  contenu?: string;

  @IsOptional()
  @IsString()
  auteur?: string;

  @IsOptional()
  @IsString()
  categorie?: string;

  @IsOptional()
  @IsBoolean()
  est_publique?: boolean = false;
}