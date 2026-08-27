import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { WorkoutTemplate } from '../../workout-template/entities/workout-template.entity';
import { WorkoutSessionExercise } from './workout-session-exercise.entity';

@Entity('workout_sessions')
export class WorkoutSession {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User)
  createdBy!: User;

  @ManyToOne(() => WorkoutTemplate, {
    nullable: true,
  })
  template: WorkoutTemplate | null = null;

  @Column({
    type: 'date',
  })
  scheduledAt!: string;

  @Column({
    default: false,
  })
  completed: boolean = false;

  @OneToMany(() => WorkoutSessionExercise, (exercise) => exercise.session, {
    cascade: true,
  })
  exercises!: WorkoutSessionExercise[];
}
