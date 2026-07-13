import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutSessionEntity } from './workout-session.entity';
import { ExerciseEntity } from '../../exercise/entities/exercise.entity';
import { WorkoutSessionSetEntity } from './workout-session-set.entity';

@Entity('workout_session_exercises')
export class WorkoutSessionExerciseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => WorkoutSessionEntity, (session) => session.exercises, {
    onDelete: 'CASCADE',
  })
  session!: WorkoutSessionEntity;

  @ManyToOne(() => ExerciseEntity)
  exercise!: ExerciseEntity;

  @Column()
  order!: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  note?: string;

  @OneToMany(() => WorkoutSessionSetEntity, (set) => set.exercise, {
    cascade: true,
  })
  sets!: WorkoutSessionSetEntity[];
}
