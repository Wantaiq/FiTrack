import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateWorkoutTemplateDto } from '../dto/create-workout-template.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { type TCurrentUser } from '../../user/types/current-user.types';
import { WorkoutTemplateService } from '../services/workout-template.service';
import { ListWorkoutsQueryDto } from '../dto/list-workout-template-query.dto';
import { UpdateWorkoutTemplateDto } from '../dto/update-workout-template.dto';

@Controller('workout-templates')
export class WorkoutTemplateController {
  constructor(
    private readonly workoutTemplateService: WorkoutTemplateService,
  ) {}

  @HttpCode(201)
  @Post('/')
  async create(
    @Body() dto: CreateWorkoutTemplateDto,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.workoutTemplateService.save(dto, currentUser);
  }

  @Get('/')
  async list(
    @Query() query: ListWorkoutsQueryDto,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.workoutTemplateService.list(query, currentUser);
  }

  @Get('/:id')
  async view(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.workoutTemplateService.view(id, currentUser);
  }

  @Delete('/:id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: TCurrentUser,
  ) {
    return this.workoutTemplateService.remove(id, currentUser);
  }

  @Put('/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() currentUser: TCurrentUser,
    @Body() dto: UpdateWorkoutTemplateDto,
  ) {
    return this.workoutTemplateService.update(id, currentUser, dto);
  }
}
