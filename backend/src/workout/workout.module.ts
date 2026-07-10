import { Module } from '@nestjs/common';
import { WorkoutService } from './services/workout.service';
import { WorkoutController } from './controllers/workout.controller';
import { WorkoutRepository } from './repositories/workout.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { WorkoutExerciseEntity } from './entities/workout-exercise.entity';
import { WorkoutSetEntity } from './entities/workout-set.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkoutEntity,
      WorkoutExerciseEntity,
      WorkoutSetEntity,
    ]),
  ],
  providers: [WorkoutService, WorkoutRepository],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
