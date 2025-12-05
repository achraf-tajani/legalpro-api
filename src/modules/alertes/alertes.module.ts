import { Module } from '@nestjs/common';
import { AlertesController } from './alertes.controller';
import { AlertesService } from './alertes.service';
import { AlertesRepository } from './alertes.repository';

@Module({
  controllers: [AlertesController],
  providers: [AlertesService, AlertesRepository],
  exports: [AlertesService],
})
export class AlertesModule {}