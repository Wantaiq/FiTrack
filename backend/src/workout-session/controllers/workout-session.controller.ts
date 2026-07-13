import { Body, Controller, Post } from '@nestjs/common';
import { WorkoutSessionService } from '../services/workout-session.service';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { type TCurrentUser } from '../../user/types/current-user.types';
import { ScheduleWorkoutSessionDto } from '../dto/schedule-workout-session.dto';

@Controller('workout-session')
export class WorkoutSessionController {
  constructor(private readonly workoutSessionService: WorkoutSessionService) {}

  @Post('/')
  async create(
    @CurrentUser() currentUser: TCurrentUser,
    @Body() dto: ScheduleWorkoutSessionDto,
  ) {
    return this.workoutSessionService.scheduleWorkout(dto, currentUser);
  }
}
