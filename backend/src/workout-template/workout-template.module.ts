import { Module } from '@nestjs/common';
import { WorkoutTemplateService } from './services/workout-template.service';
import { WorkoutTemplateController } from './controllers/workout-template.controller';
import { WorkoutTemplateRepository } from './repositories/workout-template.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutTemplateSet } from './entities/workout-template-set.entity';
import { WorkoutTemplateExercise } from './entities/workout-template-exercise.entity';
import { WorkoutTemplate } from './entities/workout-template.entity';
import { ExerciseModule } from '../exercise/exercise.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkoutTemplate,
      WorkoutTemplateExercise,
      WorkoutTemplateSet,
    ]),
    ExerciseModule,
  ],
  providers: [WorkoutTemplateService, WorkoutTemplateRepository],
  controllers: [WorkoutTemplateController],
  exports: [WorkoutTemplateRepository],
})
export class WorkoutTemplateModule {}
