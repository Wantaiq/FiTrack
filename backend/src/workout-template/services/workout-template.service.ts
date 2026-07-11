import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutTemplateRepository } from '../repositories/workout-template.repository';
import { CreateWorkoutTemplateDto } from '../dto/create-workout-template.dto';
import { TCurrentUser } from '../../user/types/current-user.types';
import { ListWorkoutsQueryDto } from '../dto/list-workout-template-query.dto';

@Injectable()
export class WorkoutTemplateService {
  constructor(
    private readonly workoutTemplateRepository: WorkoutTemplateRepository,
  ) {}

  async save(dto: CreateWorkoutTemplateDto, user: TCurrentUser) {
    return this.workoutTemplateRepository.save({
      ...dto,
      exercises: dto.exercises.map((exercise) => {
        return {
          exercise: { id: exercise.exerciseId },
          sets: exercise.sets,
          note: exercise.note,
        };
      }),
      createdBy: { id: user.id },
    });
  }

  async list(query: ListWorkoutsQueryDto, user: TCurrentUser) {
    return this.workoutTemplateRepository.findVisible(user.id, {
      name: query.name,
      page: query.page,
      limit: query.limit,
    });
  }

  async view(id: string, user: TCurrentUser) {
    const workout = await this.workoutTemplateRepository.findVisibleById(
      user.id,
      id,
    );

    if (!workout) {
      throw new NotFoundException();
    }

    return workout;
  }
}
