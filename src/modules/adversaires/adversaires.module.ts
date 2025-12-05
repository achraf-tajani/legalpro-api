import { Module } from '@nestjs/common';
import { AdversairesController } from './adversaires.controller';
import { AdversairesService } from './adversaires.service';
import { AdversairesRepository } from './adversaires.repository';

@Module({
  controllers: [AdversairesController],
  providers: [AdversairesService, AdversairesRepository],
  exports: [AdversairesService],
})
export class AdversairesModule {}