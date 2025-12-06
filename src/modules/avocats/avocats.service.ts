import { Injectable, NotFoundException } from '@nestjs/common';
import { AvocatsRepository } from './avocats.repository';
import { CreateAvocatDto } from './dto/create-avocat.dto';
import { UpdateAvocatDto } from './dto/update-avocat.dto';
import { Avocat } from './entities/avocat.entity';

@Injectable()
export class AvocatsService {
  constructor(private avocatsRepository: AvocatsRepository) {}

  async findAll(): Promise<Avocat[]> {
    return this.avocatsRepository.findAll({
      orderBy: { column: 'nom', ascending: true },
    });
  }

  async findById(id: string): Promise<Avocat> {
    const avocat = await this.avocatsRepository.findById(id);
    if (!avocat) {
      throw new NotFoundException(`Avocat #${id} non trouvé`);
    }
    return avocat;
  }

  async findByUserId(userId: string): Promise<Avocat | null> {
    return this.avocatsRepository.findByUserId(userId);
  }

  async findActifs(): Promise<Avocat[]> {
    return this.avocatsRepository.findActifs();
  }

  async findBySpecialite(specialite: string): Promise<Avocat[]> {
    return this.avocatsRepository.findBySpecialite(specialite);
  }

  async search(query: string): Promise<Avocat[]> {
    return this.avocatsRepository.search(query);
  }

  async create(createAvocatDto: CreateAvocatDto): Promise<Avocat> {
    return this.avocatsRepository.create({
      ...createAvocatDto,
      date_inscription: new Date().toISOString(),
    });
  }

  async update(id: string, updateAvocatDto: UpdateAvocatDto): Promise<Avocat> {
    const avocat = await this.avocatsRepository.findById(id);
    if (!avocat) {
      throw new NotFoundException(`Avocat #${id} non trouvé`);
    }

    return this.avocatsRepository.update(id, updateAvocatDto);
  }

  async delete(id: string): Promise<boolean> {
    const avocat = await this.avocatsRepository.findById(id);
    if (!avocat) {
      throw new NotFoundException(`Avocat #${id} non trouvé`);
    }

    return this.avocatsRepository.delete(id);
  }

  async count(): Promise<number> {
    return this.avocatsRepository.count();
  }
}