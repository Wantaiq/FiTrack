import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkoutTemplateRepository } from '../repositories/workout-template.repository';
import { CreateWorkoutTemplateDto } from '../dto/create-workout-template.dto';
import { TCurrentUser } from '../../user/types/current-user.types';
import { ListWorkoutsQueryDto } from '../dto/list-workout-template-query.dto';
import { UpdateWorkoutTemplateDto } from '../dto/update-workout-template.dto';
import { ExerciseRepository } from '../../exercise/repositories/exercise.repository';
import { WorkoutTemplateMapper } from '../mappers/workout-template.mapper';

@Injectable()
export class WorkoutTemplateService {
  constructor(
    private readonly repository: WorkoutTemplateRepository,
    private readonly exerciseRepository: ExerciseRepository,
  ) {}

  async save(dto: CreateWorkoutTemplateDto, user: TCurrentUser) {
    const exerciseIds = dto.exercises.map((e) => e.exerciseId);
    const foundExercises = await this.exerciseRepository.findVisibleByIds(
      user.id,
      exerciseIds,
    );

    if (foundExercises.length !== exerciseIds.length) {
      throw new BadRequestException('Exercises not found');
    }

    const template = WorkoutTemplateMapper.toEntity(
      user.id,
      dto,
      foundExercises,
    );

    return this.repository.save(template);
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
