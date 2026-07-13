import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutSessionEntity } from '../entities/workout-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutSessionRepository {
  constructor(
    @InjectRepository(WorkoutSessionEntity)
    private readonly repository: Repository<WorkoutSessionEntity>,
  ) {}

  async save(workoutSession: WorkoutSessionEntity) {
    return this.repository.save(workoutSession);
  }
}
