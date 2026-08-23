import { Injectable, NotFoundException } from '@nestjs/common';
import { ExerciseRepository } from '../repositories/exercise.repository';
import { TCurrentUser } from '../../user/types/current-user.types';
import { User } from '../../user/entities/user.entity';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { ListExercisesQueryDto } from '../dto/list-exercise-query.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';
import { ExerciseInstruction } from '../entities/exercise-instruction.entity';
import { Exercise } from '../entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(private readonly repository: ExerciseRepository) {}

  async save(dto: CreateExerciseDto, user?: TCurrentUser) {
    const exercise = new Exercise();
    return this.repository.save({
      ...dto,
      createdBy: user ? ({ id: user.id } as User) : null,
    });
  }

  async list(user: TCurrentUser, query: ListExercisesQueryDto) {
    return this.repository.findVisible(user.id, {
      name: query.name,
      type: query.type,
      difficulty: query.difficulty,
      mechanic: query.mechanic,
      page: query.page,
      limit: query.limit,
    });
  }

  async view(user: TCurrentUser, id: string) {
    const exercise = await this.repository.findVisibleById(user.id, id);

    if (!exercise) {
      throw new NotFoundException();
    }

    return exercise;
  }

  async remove(id: string, user: TCurrentUser) {
    const result = await this.repository.deleteVisible(user.id, id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async update(id: string, user: TCurrentUser, dto: UpdateExerciseDto) {
    const exercise = await this.repository.findVisibleById(user.id, id);

    if (!exercise) {
      throw new NotFoundException();
    }

    const { instructions, ...rest } = dto;
    this.repository.merge(exercise, rest);

    exercise.instructions = instructions.map((instruction) => {
      const exerciseInstruction = new ExerciseInstruction();

      exerciseInstruction.order = instruction.order;
      exerciseInstruction.title = instruction.title;
      exerciseInstruction.text = instruction.text;

      return exerciseInstruction;
    });

    return this.repository.save(exercise);
  }
}
