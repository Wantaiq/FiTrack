import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseEntity } from '../entities/exercise.entity';
import { CreateExerciseInput } from '../interfaces/create-exercise.interface';
import { ExerciseFilters } from '../interfaces/list-exercise-query.interface';

@Injectable()
export class ExerciseRepository {
  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly repository: Repository<ExerciseEntity>,
  ) {}

  async find(filters: ExerciseFilters) {
    const qb = this.repository.createQueryBuilder('exercise');

    if (filters.name) {
      qb.andWhere(`exercise.name ILIKE :name`, {
        name: `${filters.name}%`,
      });
    }

    if (filters.type) {
      qb.andWhere('exercise.type = :type', {
        type: filters.type,
      });
    }

    if (filters.difficulty) {
      qb.andWhere('exercise.difficulty = :difficulty', {
        difficulty: filters.difficulty,
      });
    }

    if (filters.mechanic) {
      qb.andWhere('exercise.mechanic = :mechanic', {
        mechanic: filters.mechanic,
      });
    }

    qb.skip((filters.page - 1) * filters.limit);
    qb.take(filters.limit);

    return qb.getMany();
  }

  async save(exercise: CreateExerciseInput) {
    return this.repository.save(exercise);
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }
}
