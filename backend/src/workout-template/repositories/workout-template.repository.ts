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

  async save(workout: CreateWorkoutTemplateInput) {
    return this.repository.save(workout);
  }

  async findVisible(userId: string, filters: WorkoutTemplateFilters) {
    const qb = this.repository
      .createQueryBuilder('workout')
      .where('workout.createdBy = :userId', { userId: userId });

    if (filters.name) {
      qb.andWhere(`workout.name ILIKE :name`, {
        name: `${filters.name}%`,
      });
    }

    qb.skip((filters.page - 1) * filters.limit);
    qb.take(filters.limit);

    return qb.getMany();
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
}
