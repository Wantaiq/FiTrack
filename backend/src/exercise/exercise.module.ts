import { Module } from '@nestjs/common';
import { ExerciseService } from './services/exercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './entities/exercise.entity';
import { ExerciseInstructionEntity } from './entities/exercise-instruction.entity';
import { ExerciseRepository } from './repositories/exercise.repository';
import { ExerciseController } from './controllers/exercise.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseEntity, ExerciseInstructionEntity]),
  ],
  providers: [ExerciseService, ExerciseRepository],
  controllers: [ExerciseController],
})
export class ExerciseModule {}
