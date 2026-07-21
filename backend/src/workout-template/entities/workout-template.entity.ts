import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';
import { WorkoutTemplateExerciseEntity } from './workout-template-exercise.entity';

@Entity('workout_templates')
export class WorkoutTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  createdBy!: UserEntity;

  @OneToMany(
    () => WorkoutTemplateExerciseEntity,
    (workoutExercise) => workoutExercise.workout,
    {
      cascade: true,
    },
  )
  exercises!: WorkoutTemplateExerciseEntity[];
}
