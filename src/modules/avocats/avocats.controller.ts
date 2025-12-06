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
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AvocatsService } from './avocats.service';
import { CreateAvocatDto } from './dto/create-avocat.dto';
import { UpdateAvocatDto } from './dto/update-avocat.dto';
import type { IUser } from '../../common/interfaces/user.interface';

@Controller('avocats')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AvocatsController {
  constructor(private avocatsService: AvocatsService) {}

  @Get()
  async findAll() {
    return this.avocatsService.findAll();
  }

  @Get('me')
  async findMe(@CurrentUser() user: IUser) {
    return this.avocatsService.findByUserId(user.id);
  }

  @Get('actifs')
  async findActifs() {
    return this.avocatsService.findActifs();
  }

  @Get('search')
  async search(@Query('q') query: string) {
    return this.avocatsService.search(query);
  }

  @Get('specialite/:specialite')
  async findBySpecialite(@Param('specialite') specialite: string) {
    return this.avocatsService.findBySpecialite(specialite);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.avocatsService.findById(id);
  }

  @Post()
  // @Roles('ADMIN')
  async create(@Body() createAvocatDto: CreateAvocatDto) {
    return this.avocatsService.create(createAvocatDto);
  }

  @Put(':id')
  @Roles('ADMIN', 'AVOCAT')
  async update(
    @Param('id') id: string,
    @Body() updateAvocatDto: UpdateAvocatDto,
  ) {
    return this.avocatsService.update(id, updateAvocatDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async delete(@Param('id') id: string) {
    return this.avocatsService.delete(id);
  }
}