import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
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
  async list(
    @Query() query: ListWorkoutsQueryDto,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.workoutService.list(query, currentUser);
  }

  @Get('/:id')
  async view(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.workoutService.view(id, currentUser);
  }
}
