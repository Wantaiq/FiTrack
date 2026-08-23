import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutSession } from '../entities/workout-session.entity';
import { Repository } from 'typeorm';
import { ExerciseFilters } from '../interfaces/list-workout-session-query.interface';

@Injectable()
export class WorkoutSessionRepository {
  constructor(
    @InjectRepository(WorkoutSession)
    private readonly repository: Repository<WorkoutSession>,
  ) {}

  async save(workoutSession: WorkoutSession) {
    return this.repository.save(workoutSession);
  }

  async deleteVisible(userId: string, id: string) {
    return this.repository.delete({ id: id, createdBy: { id: userId } });
  }

  async findVisible(userId: string, filters: ExerciseFilters) {
    const qb = this.repository
      .createQueryBuilder('session')
      .where('session.createdBy = :userId', {
        userId,
      })
      .leftJoinAndSelect('session.template', 'template');

    if (filters.to && filters.from) {
      qb.where('session.scheduledAt >= :from', { from: filters.from }).andWhere(
        'session.scheduledAt < :to',
        { to: filters.to },
      );
    }

    return qb.getMany();
  }
}
