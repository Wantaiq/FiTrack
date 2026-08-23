import { IsNull, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExerciseInput } from '../interfaces/create-exercise.interface';
import { ExerciseFilters } from '../interfaces/list-exercise-query.interface';
import { UpdateExerciseInput } from '../interfaces/update-exercise.interface';
import { Exercise } from '../entities/exercise.entity';

@Injectable()
export class ExerciseRepository {
  constructor(
    @InjectRepository(Exercise)
    private readonly repository: Repository<Exercise>,
  ) {}

  async findVisible(userId: string, filters: ExerciseFilters) {
    const qb = this.repository
      .createQueryBuilder('exercise')
      .where('(exercise.createdBy = :userId OR exercise.createdBy IS NULL)', {
        userId,
      });

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

    const [exercises, totalExercises] = await qb
      .skip((filters.page - 1) * filters.limit)
      .take(filters.limit)
      .getManyAndCount();

    return {
      items: exercises,
      meta: {
        page: filters.page,
        limit: filters.limit,
        totalItems: totalExercises,
        totalPages: Math.ceil(totalExercises / filters.limit),
      },
    };
  }

  async save(exercise: CreateExerciseInput) {
    return this.repository.save(exercise);
  }

  async findVisibleById(userId: string, id: string) {
    return this.repository.findOne({
      where: [
        { id, createdBy: IsNull() },
        { id, createdBy: { id: userId } },
      ],
      relations: {
        instructions: true,
      },
      order: {
        instructions: {
          order: 'ASC',
        },
      },
    });
  }

  async deleteVisible(userId: string, id: string) {
    return this.repository.delete({
      id: id,
      createdBy: { id: userId },
    });
  }

  merge(
    exercise: Exercise,
    updateExercise: Omit<UpdateExerciseInput, 'instructions'>,
  ) {
    return this.repository.merge(exercise, updateExercise);
  }
}
