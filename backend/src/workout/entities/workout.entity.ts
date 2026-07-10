import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { WorkoutExerciseEntity } from './workout-exercise.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { IsEnum } from 'class-validator';
import { WorkoutStatus } from '../enums/workout.enum';

@Entity('workouts')
export class WorkoutEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  //@Column({
  //type: 'date',
  //})
  //date!: Date;

  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  createdBy!: UserEntity;

  @OneToMany(
    () => WorkoutExerciseEntity,
    (workoutExercise) => workoutExercise.workout,
    {
      cascade: true,
    },
  )
  exercises!: WorkoutExerciseEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
