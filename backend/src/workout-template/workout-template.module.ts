import { Module } from '@nestjs/common';
import { WorkoutTemplateService } from './services/workout-template.service';
import { WorkoutTemplateController } from './controllers/workout-template.controller';
import { WorkoutTemplateRepository } from './repositories/workout-template.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutTemplateSetEntity } from './entities/workout-template-set.entity';
import { WorkoutTemplateExerciseEntity } from './entities/workout-template-exercise.entity';
import { WorkoutTemplateEntity } from './entities/workout-template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkoutTemplateEntity,
      WorkoutTemplateExerciseEntity,
      WorkoutTemplateSetEntity,
    ]),
  ],
  providers: [WorkoutTemplateService, WorkoutTemplateRepository],
  controllers: [WorkoutTemplateController],
})
export class WorkoutTemplateModule {}
