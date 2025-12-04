import { Module } from '@nestjs/common';
import { DossiersController } from './dossiers.controller';
import { DossiersService } from './dossiers.service';
import { DossiersRepository } from './dossiers.repository';

@Module({
  controllers: [DossiersController],
  providers: [DossiersService, DossiersRepository],
  exports: [DossiersService],
})
export class DossiersModule {}