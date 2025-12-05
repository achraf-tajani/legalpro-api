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
import { ProceduresService } from './procedures.service';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';

@Controller('procedures')
@UseGuards(JwtAuthGuard)
export class ProceduresController {
  constructor(private proceduresService: ProceduresService) {}

  @Get()
  async findAll() {
    return this.proceduresService.findAll();
  }

  @Get('upcoming')
  async findUpcoming(@Query('days') days?: string) {
    const numDays = days ? parseInt(days, 10) : 7;
    return this.proceduresService.findUpcoming(numDays);
  }

  @Get('stats')
  async getStats() {
    const total = await this.proceduresService.count();
    return { total };
  }

  @Get('dossier/:dossierId')
  async findByDossier(@Param('dossierId') dossierId: string) {
    return this.proceduresService.findByDossier(dossierId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.proceduresService.findById(id);
  }

  @Post()
  async create(@Body() createProcedureDto: CreateProcedureDto) {
    return this.proceduresService.create(createProcedureDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
  ) {
    return this.proceduresService.update(id, updateProcedureDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.proceduresService.delete(id);
  }
}