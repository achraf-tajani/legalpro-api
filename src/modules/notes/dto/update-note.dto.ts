import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  titre?: string;

  @IsOptional()
  @IsString()
  contenu?: string;

  @IsOptional()
  @IsString()
  categorie?: string;

  @IsOptional()
  @IsBoolean()
  est_publique?: boolean;
}