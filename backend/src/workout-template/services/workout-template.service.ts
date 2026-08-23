import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutTemplateRepository } from '../repositories/workout-template.repository';
import { CreateWorkoutTemplateDto } from '../dto/create-workout-template.dto';
import { TCurrentUser } from '../../user/types/current-user.types';
import { ListWorkoutsQueryDto } from '../dto/list-workout-template-query.dto';
import { UpdateWorkoutTemplateDto } from '../dto/update-workout-template.dto';

@Injectable()
export class WorkoutTemplateService {
  constructor(private readonly repository: WorkoutTemplateRepository) {}

  async save(dto: CreateWorkoutTemplateDto, user: TCurrentUser) {
    const workoutTemplate = await this.repository.save({
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

    return {
      id: workoutTemplate.id,
      name: workoutTemplate.name,
    };
  }

  async list(query: ListWorkoutsQueryDto, user: TCurrentUser) {
    return this.repository.findVisible(user.id, {
      name: query.name,
      page: query.page,
      limit: query.limit,
    });
  }

  async view(id: string, user: TCurrentUser) {
    const workout = await this.repository.findVisibleById(user.id, id);

    if (!workout) {
      throw new NotFoundException();
    }

    return workout;
  }

  async remove(id: string, user: TCurrentUser) {
    return this.repository.deleteVisible(user.id, id);
  }

  async update(id: string, user: TCurrentUser, dto: UpdateWorkoutTemplateDto) {
    return;
  }
}
