import { Module } from '@nestjs/common';
import { WorkoutSessionService } from './services/workout-session.service';
import { WorkoutSessionController } from './controllers/workout-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutSessionEntity } from './entities/workout-session.entity';
import { WorkoutSessionExerciseEntity } from './entities/workout-session-exercise.entity';
import { WorkoutSessionSetEntity } from './entities/workout-session-set.entity';
import { WorkoutSessionRepository } from './repositories/workout-session.repository';
import { WorkoutTemplateRepository } from '../workout-template/repositories/workout-template.repository';
import { WorkoutTemplateModule } from '../workout-template/workout-template.module';
import { WorkoutTemplateEntity } from '../workout-template/entities/workout-template.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkoutSessionEntity,
      WorkoutSessionExerciseEntity,
      WorkoutSessionSetEntity,
      WorkoutTemplateEntity,
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
