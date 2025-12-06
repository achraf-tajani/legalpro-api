import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { FacturesService } from './factures.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';

@Controller('factures')
@UseGuards(JwtAuthGuard)
export class FacturesController {
  constructor(private facturesService: FacturesService) {}

  @Get()
  async findAll() {
    return this.facturesService.findAll();
  }

  @Get('unpaid')
  async findUnpaid() {
    return this.facturesService.findUnpaid();
  }

  @Get('statut/:statut')
  async findByStatut(@Param('statut') statut: string) {
    return this.facturesService.findByStatut(statut);
  }

  @Get('stats')
  async getStats() {
    const [total, revenue, unpaid] = await Promise.all([
      this.facturesService.count(),
      this.facturesService.getTotalRevenue(),
      this.facturesService.getTotalUnpaid(),
    ]);

    return { total, revenue, unpaid };
  }

  @Get('dossier/:dossierId')
  async findByDossier(@Param('dossierId') dossierId: string) {
    return this.facturesService.findByDossier(dossierId);
  }

  @Get('client/:clientId')
  async findByClient(@Param('clientId') clientId: string) {
    return this.facturesService.findByClient(clientId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.facturesService.findById(id);
  }

@Post()
async create(@Body() createFactureDto: CreateFactureDto) {
  return this.facturesService.create(createFactureDto);
}
  @Post('test')
  async testBody(@Body() body: any) {
    console.log('=== RAW BODY ===');
    console.log(body);
    console.log('id_dossier:', body.id_dossier);
    console.log('id_client:', body.id_client);
    return { received: body };
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFactureDto: UpdateFactureDto,
  ) {
    return this.facturesService.update(id, updateFactureDto);
  }

  @Put(':id/pay')
  async markAsPaid(@Param('id') id: string, @Body('montant') montant?: number) {
    return this.facturesService.markAsPaid(id, montant);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.facturesService.delete(id);
  }
}