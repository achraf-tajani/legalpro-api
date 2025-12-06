import { Module } from '@nestjs/common';
import { AvocatsController } from './avocats.controller';
import { AvocatsService } from './avocats.service';
import { AvocatsRepository } from './avocats.repository';

@Module({
  controllers: [AvocatsController],
  providers: [AvocatsService, AvocatsRepository],
  exports: [AvocatsService],
})
export class AvocatsModule {}