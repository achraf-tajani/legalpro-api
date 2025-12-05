import { Injectable, NotFoundException } from '@nestjs/common';
import { ProceduresRepository } from './procedures.repository';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { Procedure } from './entities/procedure.entity';

@Injectable()
export class ProceduresService {
  constructor(private proceduresRepository: ProceduresRepository) {}

  async findAll(): Promise<Procedure[]> {
    return this.proceduresRepository.findWithDossier();
  }

  async findById(id: string): Promise<Procedure> {
    const procedure = await this.proceduresRepository.findById(id);
    if (!procedure) {
      throw new NotFoundException(`Procédure #${id} non trouvée`);
    }
    return procedure;
  }

  async findByDossier(dossierId: string): Promise<Procedure[]> {
    return this.proceduresRepository.findByDossier(dossierId);
  }

  async findUpcoming(days: number = 7): Promise<Procedure[]> {
    return this.proceduresRepository.findUpcoming(days);
  }

  async create(createProcedureDto: CreateProcedureDto): Promise<Procedure> {
    return this.proceduresRepository.create({
      ...createProcedureDto,
    });
  }

  async update(id: string, updateProcedureDto: UpdateProcedureDto): Promise<Procedure> {
    const procedure = await this.proceduresRepository.findById(id);
    if (!procedure) {
      throw new NotFoundException(`Procédure #${id} non trouvée`);
    }

    return this.proceduresRepository.update(id, updateProcedureDto);
  }

  async delete(id: string): Promise<boolean> {
    const procedure = await this.proceduresRepository.findById(id);
    if (!procedure) {
      throw new NotFoundException(`Procédure #${id} non trouvée`);
    }

    return this.proceduresRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.proceduresRepository.count();
  }
}