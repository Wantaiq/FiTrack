import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from '../repositories/workout.repository';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { TCurrentUser } from '../../user/types/current-user.types';
import { ListWorkoutsQueryDto } from '../dto/list-workout-query.dto';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  async save(dto: CreateWorkoutDto, user: TCurrentUser) {
    return this.workoutRepository.save({
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

  async list(query: ListWorkoutsQueryDto) {
    return this.workoutRepository.find({
      name: query.name,
      page: query.page,
      limit: query.limit,
    });
  }
}
