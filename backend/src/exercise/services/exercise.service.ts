import { Injectable, NotFoundException } from '@nestjs/common';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { TCurrentUser } from '../../user/types/current-user.types';
import { UserEntity } from '../../user/entities/user.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { ListExercisesQueryDto } from '../dto/list-exercise-query.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async save(dto: CreateExerciseDto, user?: TCurrentUser) {
    return this.exerciseRepository.save({
      ...dto,
      createdBy: user ? ({ id: user.id } as UserEntity) : null,
    });
  }

  async list(user: TCurrentUser, query: ListExercisesQueryDto) {
    return this.exerciseRepository.findVisible(user.id, {
      name: query.name,
      type: query.type,
      difficulty: query.difficulty,
      mechanic: query.mechanic,
      page: query.page,
      limit: query.limit,
    });
  }

  async view(user: TCurrentUser, id: string) {
    const exercise = await this.exerciseRepository.findVisibleById(user.id, id);

    if (!exercise) {
      throw new NotFoundException();
    }

    return exercise;
  }

  async remove(id: string, user: TCurrentUser) {
    const result = await this.exerciseRepository.deleteVisible(user.id, id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
