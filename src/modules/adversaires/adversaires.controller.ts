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
import { AdversairesService } from './adversaires.service';
import { CreateAdversaireDto } from './dto/create-adversaire.dto';
import { UpdateAdversaireDto } from './dto/update-adversaire.dto';

@Controller('adversaires')
@UseGuards(JwtAuthGuard)
export class AdversairesController {
  constructor(private adversairesService: AdversairesService) {}

  @Get()
  async findAll() {
    return this.adversairesService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.adversairesService.search(query);
  }

  @Get('dossier/:dossierId')
  async findByDossier(@Param('dossierId') dossierId: string) {
    return this.adversairesService.findByDossier(dossierId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.adversairesService.findById(id);
  }

  @Post()
  async create(@Body() createAdversaireDto: CreateAdversaireDto) {
    return this.adversairesService.create(createAdversaireDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdversaireDto: UpdateAdversaireDto,
  ) {
    return this.adversairesService.update(id, updateAdversaireDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adversairesService.delete(id);
  }
}