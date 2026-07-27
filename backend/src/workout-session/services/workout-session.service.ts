import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleWorkoutSessionDto } from '../dto/schedule-workout-session.dto';
import { TCurrentUser } from '../../user/types/current-user.types';
import { WorkoutSessionRepository } from '../repositories/workout-session.repository';
import { WorkoutTemplateRepository } from '../../workout-template/repositories/workout-template.repository';
import { WorkoutSessionMapper } from '../mappers/workout-session-mapper';
import { ListWorkoutSessionQueryDto } from '../dto/list-workout-session-query.dto';

@Injectable()
export class WorkoutSessionService {
  constructor(
    private readonly workoutSessionRepository: WorkoutSessionRepository,
    private readonly workoutTemplateRepository: WorkoutTemplateRepository,
  ) {}
  async scheduleWorkout(dto: ScheduleWorkoutSessionDto, user: TCurrentUser) {
    const template = await this.workoutTemplateRepository.findVisibleById(
      user.id,
      dto.templateId,
    );

    if (!template) {
      throw new NotFoundException();
    }

    const session = WorkoutSessionMapper.fromTemplate(
      template,
      user.id,
      dto.scheduledAt,
    );

    return this.workoutSessionRepository.save(session);
  }

  async remove(id: string, user: TCurrentUser) {
    return this.workoutSessionRepository.deleteVisible(user.id, id);
  }

  async list(user: TCurrentUser, query: ListWorkoutSessionQueryDto) {
    const from = new Date(query.year, query.month - 1, 1);
    const to = new Date(query.year, query.month, 1);

    return this.workoutSessionRepository.findVisible(user.id, { from, to });
  }
}
