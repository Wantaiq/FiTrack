import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutTemplateEntity } from '../entities/workout-template.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutTemplateInput } from '../interfaces/create-workout-template.interface';
import { WorkoutTemplateFilters } from '../interfaces/list-workout-template-query.interface';

@Injectable()
export class WorkoutTemplateRepository {
  constructor(
    @InjectRepository(WorkoutTemplateEntity)
    private readonly repository: Repository<WorkoutTemplateEntity>,
  ) {}

  async save(workoutTemplate: CreateWorkoutTemplateInput) {
    return this.repository.save(workoutTemplate);
  }

  async findVisible(userId: string, filters: WorkoutTemplateFilters) {
    const qb = this.repository
      .createQueryBuilder('workout_template')
      .where('workout_template.createdBy = :userId', { userId: userId })
      .leftJoinAndSelect('workout_template.exercises', 'exercises')
      .leftJoinAndSelect('exercises.exercise', 'exercise');

    if (filters.name) {
      qb.andWhere(`workout_template.name ILIKE :name`, {
        name: `${filters.name}%`,
      });
    }

    const [workoutTemplates, totalWorkoutTemplates] = await qb
      .skip((filters.page - 1) * filters.limit)
      .take(filters.limit)
      .getManyAndCount();

    return {
      items: workoutTemplates,
      meta: {
        page: filters.page,
        limit: filters.limit,
        totalItems: totalWorkoutTemplates,
        totalPages: Math.ceil(totalWorkoutTemplates / filters.limit),
      },
    };
  }

  async findVisibleById(userId: string, id: string) {
    return this.repository.findOne({
      where: { id, createdBy: { id: userId } },
      relations: {
        exercises: {
          exercise: true,
          sets: true,
        },
      },
    });
  }

  async deleteVisible(userId: string, id: string) {
    return this.repository.delete({ id: id, createdBy: { id: userId } });
  }
}
