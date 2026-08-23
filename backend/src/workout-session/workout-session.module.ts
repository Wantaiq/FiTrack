import { Module } from '@nestjs/common';
import { WorkoutSessionService } from './services/workout-session.service';
import { WorkoutSessionController } from './controllers/workout-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSession } from './entities/workout-session.entity';
import { WorkoutSessionExercise } from './entities/workout-session-exercise.entity';
import { WorkoutSessionSet } from './entities/workout-session-set.entity';
import { WorkoutSessionRepository } from './repositories/workout-session.repository';
import { WorkoutTemplateModule } from '../workout-template/workout-template.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkoutSession,
      WorkoutSessionExercise,
      WorkoutSessionSet,
    ]),
    WorkoutTemplateModule,
  ],
  providers: [WorkoutSessionService, WorkoutSessionRepository],
  controllers: [WorkoutSessionController],
})
export class WorkoutSessionModule {}
