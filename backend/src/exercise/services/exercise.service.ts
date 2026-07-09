import { Injectable } from '@nestjs/common';
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

  async list(query: ListExercisesQueryDto) {
    return this.exerciseRepository.find({
      name: query.name,
      type: query.type,
      difficulty: query.difficulty,
      mechanic: query.mechanic,
      page: query.page,
      limit: query.limit,
    });
  }

  async view(id: string) {
    return this.exerciseRepository.findById(id);
  }
}
