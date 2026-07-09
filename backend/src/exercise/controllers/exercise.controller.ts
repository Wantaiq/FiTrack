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
import { ExerciseService } from '../services/exercise.service';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { type TCurrentUser } from '../../user/types/current-user.types';
import { ListExercisesQueryDto } from '../dto/list-exercise-query.dto';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @HttpCode(201)
  @Post('/')
  async create(
    @Body() dto: CreateExerciseDto,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    await this.exerciseService.save(dto, currentUser);
  }

  @Get('/')
  async list(@Query() query: ListExercisesQueryDto) {
    return this.exerciseService.list(query);
  }

  @Get('/:id')
  async view(@Param('id', ParseUUIDPipe) id: string) {
    return this.exerciseService.view(id);
  }
}
