import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, ExerciseModule, WorkoutModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
