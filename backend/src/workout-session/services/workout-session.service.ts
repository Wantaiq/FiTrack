import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleWorkoutSessionDto } from '../dto/schedule-workout-session.dto';
import { TCurrentUser } from '../../user/types/current-user.types';
import { WorkoutSessionRepository } from '../repositories/workout-session.repository';
import { WorkoutTemplateRepository } from '../../workout-template/repositories/workout-template.repository';
import { WorkoutSessionEntity } from '../entities/workout-session.entity';
import { WorkoutSessionMapper } from '../mappers/workout-session-mapper';

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
}
