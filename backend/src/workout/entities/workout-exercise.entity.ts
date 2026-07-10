import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutEntity } from './workout.entity';
import { WorkoutSetEntity } from './workout-set.entity';
import { ExerciseEntity } from '../../exercise/entities/exercise.entity';

@Entity('workout_exercises')
export class WorkoutExerciseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => WorkoutEntity, (workout) => workout.exercises, {
    onDelete: 'CASCADE',
  })
  workout!: WorkoutEntity;

  @ManyToOne(() => ExerciseEntity, {
    nullable: false,
  })
  exercise!: ExerciseEntity;

  @Column({
    nullable: true,
  })
  note?: string;

  @OneToMany(() => WorkoutSetEntity, (set) => set.workoutExercise, {
    cascade: true,
  })
  sets!: WorkoutSetEntity[];
}
