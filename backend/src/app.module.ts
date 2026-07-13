import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutTemplateModule } from './workout-template/workout-template.module';
import { WorkoutSessionModule } from './workout-session/workout-session.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    ExerciseModule,
    WorkoutTemplateModule,
    WorkoutSessionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
