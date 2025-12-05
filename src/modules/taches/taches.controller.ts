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
import { TachesService } from './taches.service';
import { CreateTacheDto } from './dto/create-tache.dto';
import { UpdateTacheDto } from './dto/update-tache.dto';

@Controller('taches')
@UseGuards(JwtAuthGuard)
export class TachesController {
  constructor(private tachesService: TachesService) {}

  @Get()
  async findAll() {
    return this.tachesService.findAll();
  }

  @Get('overdue')
  async findOverdue() {
    return this.tachesService.findOverdue();
  }

  @Get('statut/:statut')
  async findByStatut(@Param('statut') statut: string) {
    return this.tachesService.findByStatut(statut);
  }

  @Get('stats')
  async getStats() {
    const [total, nonCommencees, enCours, completees] = await Promise.all([
      this.tachesService.count(),
      this.tachesService.countByStatut('non_commencée'),
      this.tachesService.countByStatut('en_cours'),
      this.tachesService.countByStatut('complétée'),
    ]);

    return { total, nonCommencees, enCours, completees };
  }

  @Get('dossier/:dossierId')
  async findByDossier(@Param('dossierId') dossierId: string) {
    return this.tachesService.findByDossier(dossierId);
  }

  @Get('assigne/:avocatId')
  async findByAssigne(@Param('avocatId') avocatId: string) {
    return this.tachesService.findByAssigne(avocatId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.tachesService.findById(id);
  }

  @Post()
  async create(@Body() createTacheDto: CreateTacheDto) {
    return this.tachesService.create(createTacheDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTacheDto: UpdateTacheDto,
  ) {
    return this.tachesService.update(id, updateTacheDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tachesService.delete(id);
  }
}