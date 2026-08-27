import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ExerciseService } from '../services/exercise.service';
import { CreateExerciseDto } from '../dto/create-exercise.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { type TCurrentUser } from '../../user/types/current-user.types';
import { ListExercisesQueryDto } from '../dto/list-exercise-query.dto';
import {
  ExerciseResponseDto,
  ExercisesListResponseDto,
} from '../dto/exercise-response.dto';
import { UpdateExerciseDto } from '../dto/update-exercise.dto';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @HttpCode(201)
  @Post('/')
  async create(
    @Body() dto: CreateExerciseDto,
    @CurrentUser() currentUser: TCurrentUser,
  ): Promise<ExerciseResponseDto> {
    const { createdBy, ...rest } = await this.exerciseService.save(
      dto,
      currentUser,
    );

    return rest;
  }

  @Get('/')
  async list(
    @Query() query: ListExercisesQueryDto,
    @CurrentUser() currentUser: TCurrentUser,
  ): Promise<ExercisesListResponseDto> {
    return this.exerciseService.list(currentUser, query);
  }

  @Get('/:id')
  async view(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: TCurrentUser,
  ): Promise<ExerciseResponseDto> {
    return this.exerciseService.view(currentUser, id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: TCurrentUser,
    @Body() dto: UpdateExerciseDto,
  ) {
    await this.exerciseService.update(id, currentUser, dto);
  }

  @Delete('/:id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: TCurrentUser,
  ): Promise<void> {
    await this.exerciseService.remove(id, currentUser);
  }
}
