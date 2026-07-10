import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { type TCurrentUser } from '../../user/types/current-user.types';
import { WorkoutService } from '../services/workout.service';
import { ListWorkoutsQueryDto } from '../dto/list-workout-query.dto';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @HttpCode(201)
  @Post('/')
  async create(
    @Body() dto: CreateWorkoutDto,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    await this.workoutService.save(dto, currentUser);
  }

  @Get('/')
  async list(@Query() query: ListWorkoutsQueryDto) {
    return this.workoutService.list(query);
  }
}
