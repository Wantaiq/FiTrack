import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';
import { WorkoutTemplateExerciseEntity } from './workout-template-exercise.entity';

@Entity('workout_templates')
export class WorkoutTemplateEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
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
