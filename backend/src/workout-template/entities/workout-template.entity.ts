import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { WorkoutTemplateExercise } from './workout-template-exercise.entity';

@Entity('workout_templates')
export class WorkoutTemplate {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @ManyToOne(() => User, {
    nullable: false,
  })
  createdBy!: User;

  @OneToMany(
    () => WorkoutTemplateExercise,
    (workoutExercise) => workoutExercise.workout,
    {
      cascade: true,
      orphanedRowAction: 'delete',
    },
  )
  exercises!: WorkoutTemplateExercise[];
}
