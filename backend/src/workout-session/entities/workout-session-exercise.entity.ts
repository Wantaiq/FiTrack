import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutSession } from './workout-session.entity';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { WorkoutSessionSet } from './workout-session-set.entity';

@Entity('workout_session_exercises')
export class WorkoutSessionExercise {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => WorkoutSession, (session) => session.exercises, {
    onDelete: 'CASCADE',
  })
  session!: WorkoutSession;

  @ManyToOne(() => Exercise)
  exercise!: Exercise;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  note: string | null = null;

  @OneToMany(() => WorkoutSessionSet, (set) => set.exercise, {
    cascade: true,
  })
  sets!: WorkoutSessionSet[];
}
