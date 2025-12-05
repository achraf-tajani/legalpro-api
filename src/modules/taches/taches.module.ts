import { Module } from '@nestjs/common';
import { TachesController } from './taches.controller';
import { TachesService } from './taches.service';
import { TachesRepository } from './taches.repository';

@Module({
  controllers: [TachesController],
  providers: [TachesService, TachesRepository],
  exports: [TachesService],
})
export class TachesModule {}