import { Module } from '@nestjs/common';
import { WorkoutSessionService } from './services/workout-session.service';
import { WorkoutSessionController } from './controllers/workout-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSession } from './entities/workout-session.entity';
import { WorkoutSessionExercise } from './entities/workout-session-exercise.entity';
import { WorkoutSessionSet } from './entities/workout-session-set.entity';
import { WorkoutSessionRepository } from './repositories/workout-session.repository';
import { WorkoutTemplateRepository } from '../workout-template/repositories/workout-template.repository';
import { WorkoutTemplateModule } from '../workout-template/workout-template.module';
import { WorkoutTemplate } from '../workout-template/entities/workout-template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkoutSession,
      WorkoutSessionExercise,
      WorkoutSessionSet,
      WorkoutTemplate,
    ]),
    WorkoutTemplateModule,
  ],
  providers: [
    WorkoutSessionService,
    WorkoutSessionRepository,
    WorkoutTemplateRepository,
  ],
  controllers: [WorkoutSessionController],
})
export class WorkoutSessionModule {}
