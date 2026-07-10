import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutEntity } from '../entities/workout.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutInput } from '../interfaces/create-workout.interface';
import { WorkoutFilters } from '../interfaces/list-workout-query.interface';

@Injectable()
export class WorkoutRepository {
  constructor(
    @InjectRepository(WorkoutEntity)
    private readonly repository: Repository<WorkoutEntity>,
  ) {}

  async save(workout: CreateWorkoutInput) {
    return this.repository.save(workout);
  }

  async findVisible(userId: string, filters: WorkoutFilters) {
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
    });
  }
}
