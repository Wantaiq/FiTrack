import { Module } from '@nestjs/common';
import { ExerciseService } from './services/exercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { ExerciseInstruction } from './entities/exercise-instruction.entity';
import { ExerciseRepository } from './repositories/exercise.repository';
import { ExerciseController } from './controllers/exercise.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseInstruction])],
  providers: [ExerciseService, ExerciseRepository],
  controllers: [ExerciseController],
  exports: [ExerciseRepository],
})
export class ExerciseModule {}
