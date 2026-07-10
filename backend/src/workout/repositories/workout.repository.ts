import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutEntity } from '../entities/workout.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutInput } from '../interfaces/create-workout.interface';

@Injectable()
export class WorkoutRepository {
  constructor(
    @InjectRepository(WorkoutEntity)
    private readonly repository: Repository<WorkoutEntity>,
  ) {}

  async save(workout: CreateWorkoutInput) {
    return this.repository.save(workout);
  }
}
