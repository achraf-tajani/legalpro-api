import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { DossiersService } from './dossiers.service';
import { CreateDossierDto } from './dto/create-dossier.dto';
import { UpdateDossierDto } from './dto/update-dossier.dto';
import type { IUser } from '../../common/interfaces/user.interface';

@Controller('dossiers')
@UseGuards(JwtAuthGuard)
export class DossiersController {
  constructor(private dossiersService: DossiersService) {}

  @Get()
  async findAll() {
    return this.dossiersService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.dossiersService.search(query);
  }

  @Get('stats')
  async getStats() {
    const [total, ouverts, enCours, clos] = await Promise.all([
      this.dossiersService.count(),
      this.dossiersService.countByStatut('ouvert'),
      this.dossiersService.countByStatut('en_cours'),
      this.dossiersService.countByStatut('clos'),
    ]);

    return { total, ouverts, enCours, clos };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.dossiersService.findById(id);
  }

  @Get('client/:clientId')
  async findByClient(@Param('clientId') clientId: string) {
    return this.dossiersService.findByClient(clientId);
  }

  @Get('avocat/:avocatId')
  async findByAvocat(@Param('avocatId') avocatId: string) {
    return this.dossiersService.findByAvocat(avocatId);
  }

  @Post()
  async create(
    @Body() createDossierDto: CreateDossierDto,
    @CurrentUser() user: IUser,
  ) {
    return this.dossiersService.create(createDossierDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDossierDto: UpdateDossierDto,
  ) {
    return this.dossiersService.update(id, updateDossierDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.dossiersService.delete(id);
  }
}