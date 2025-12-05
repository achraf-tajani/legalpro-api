import { Module } from '@nestjs/common';
import { FacturesController } from './factures.controller';
import { FacturesService } from './factures.service';
import { FacturesRepository } from './factures.repository';

@Module({
  controllers: [FacturesController],
  providers: [FacturesService, FacturesRepository],
  exports: [FacturesService],
})
export class FacturesModule {}