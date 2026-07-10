import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { type TCurrentUser } from '../../user/types/current-user.types';
import { WorkoutService } from '../services/workout.service';

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
}
