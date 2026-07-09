import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, ExerciseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
