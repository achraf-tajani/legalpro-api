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
import { AlertesService } from './alertes.service';
import { CreateAlerteDto } from './dto/create-alerte.dto';
import { UpdateAlerteDto } from './dto/update-alerte.dto';
import type { IUser } from '../../common/interfaces/user.interface';

@Controller('alertes')
@UseGuards(JwtAuthGuard)
export class AlertesController {
  constructor(private alertesService: AlertesService) {}

  @Get()
  async findAll() {
    return this.alertesService.findAll();
  }

  @Get('mes-alertes')
  async findMesAlertes(@CurrentUser() user: IUser) {
    return this.alertesService.findByDestinataire(user.id);
  }

  @Get('non-lues')
  async findNonLues(@CurrentUser() user: IUser) {
    return this.alertesService.findNonLues(user.id);
  }

  @Get('count-non-lues')
  async countNonLues(@CurrentUser() user: IUser) {
    const count = await this.alertesService.countNonLues(user.id);
    return { count };
  }

  @Get('upcoming')
  async findUpcoming(@Query('days') days?: string) {
    const numDays = days ? parseInt(days, 10) : 7;
    return this.alertesService.findUpcoming(numDays);
  }

  @Get('dossier/:dossierId')
  async findByDossier(@Param('dossierId') dossierId: string) {
    return this.alertesService.findByDossier(dossierId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.alertesService.findById(id);
  }

  @Post()
  async create(@Body() createAlerteDto: CreateAlerteDto) {
    return this.alertesService.create(createAlerteDto);
  }

  @Put('mark-all-read')
  async markAllAsRead(@CurrentUser() user: IUser) {
    await this.alertesService.markAllAsRead(user.id);
    return { success: true };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlerteDto: UpdateAlerteDto,
  ) {
    return this.alertesService.update(id, updateAlerteDto);
  }

  @Put(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.alertesService.markAsRead(id);
  }

  @Put(':id/archive')
  async archive(@Param('id') id: string) {
    return this.alertesService.archive(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.alertesService.delete(id);
  }
}