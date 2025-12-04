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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async findAll() {
    return this.clientsService.findAll();
  }

  @Get('actifs')
  async findActifs() {
    return this.clientsService.findActifs();
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.clientsService.search(query);
  }

  @Get('stats')
  async getStats() {
    const total = await this.clientsService.count();
    return { total };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.clientsService.findById(id);
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }
}