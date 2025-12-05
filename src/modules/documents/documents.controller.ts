import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get()
  async findAll() {
    return this.documentsService.findAll();
  }

  @Get('templates')
  async findTemplates() {
    return this.documentsService.findTemplates();
  }

  @Get('categorie/:categorie')
  async findByCategorie(@Param('categorie') categorie: string) {
    return this.documentsService.findByCategorie(categorie);
  }

  @Get('dossier/:dossierId')
  async findByDossier(@Param('dossierId') dossierId: string) {
    return this.documentsService.findByDossier(dossierId);
  }

  @Get('stats')
  async getStats() {
    const total = await this.documentsService.count();
    return { total };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.documentsService.findById(id);
  }

  @Get(':id/download')
  async download(@Param('id') id: string, @Res() res: Response) {
    const { buffer, document } = await this.documentsService.download(id);

    res.set({
      'Content-Type': document.format || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${document.nom}"`,
      'Content-Length': buffer.length,
    });

    res.send(buffer);
  }

  @Get(':id/url')
  async getSignedUrl(@Param('id') id: string) {
    const url = await this.documentsService.getSignedUrl(id);
    return { url };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }), // 50MB max
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createDocumentDto: CreateDocumentDto,
  ) {
    return this.documentsService.upload(
      file.buffer,
      file.originalname,
      file.mimetype,
      createDocumentDto,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.documentsService.delete(id);
  }
}