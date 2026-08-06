import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseInstructionEntity } from '../entities/exercise-instruction.entity';
import { CreateInstructionInput } from '../interfaces/create-exercise.interface';

@Injectable()
export class ExerciseInstructionRepository {
  constructor(
    @InjectRepository(ExerciseInstructionEntity)
    private readonly repository: Repository<ExerciseInstructionEntity>,
  ) {}

  create(instruction: CreateInstructionInput) {
    return this.repository.create(instruction);
  }
}
