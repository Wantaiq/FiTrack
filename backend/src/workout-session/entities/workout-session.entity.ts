import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { WorkoutTemplateEntity } from '../../workout-template/entities/workout-template.entity';
import { WorkoutSessionExerciseEntity } from './workout-session-exercise.entity';

@Entity('workout_sessions')
export class WorkoutSessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => UserEntity)
  createdBy!: UserEntity;

  @ManyToOne(() => WorkoutTemplateEntity, {
    nullable: true,
  })
  template!: WorkoutTemplateEntity | null;

  @Column({
    type: 'timestamp',
  })
  scheduledAt!: Date;

  @OneToMany(
    () => WorkoutSessionExerciseEntity,
    (exercise) => exercise.session,
    {
      cascade: true,
    },
  )
  exercises!: WorkoutSessionExerciseEntity[];
}
