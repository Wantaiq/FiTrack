import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { WorkoutSessionService } from '../services/workout-session.service';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { type TCurrentUser } from '../../user/types/current-user.types';
import { ScheduleWorkoutSessionDto } from '../dto/schedule-workout-session.dto';
import { ListWorkoutSessionQueryDto } from '../dto/list-workout-session-query.dto';

@Controller('workout-sessions')
export class WorkoutSessionController {
  constructor(private readonly workoutSessionService: WorkoutSessionService) {}

  @Post('/')
  async create(
    @CurrentUser() currentUser: TCurrentUser,
    @Body() dto: ScheduleWorkoutSessionDto,
  ) {
    return this.workoutSessionService.scheduleWorkout(dto, currentUser);
  }

  @Delete('/:id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.workoutSessionService.remove(id, currentUser);
  }

  @Get('/')
  async list(
    @Query() query: ListWorkoutSessionQueryDto,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.workoutSessionService.list(currentUser, query);
  }
}
