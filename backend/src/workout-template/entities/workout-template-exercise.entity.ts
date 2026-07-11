import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutTemplateEntity } from './workout-template.entity';
import { ExerciseEntity } from '../../exercise/entities/exercise.entity';
import { WorkoutTemplateSetEntity } from './workout-template-set.entity';

@Entity('workout_template_exercises')
export class WorkoutTemplateExerciseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => WorkoutTemplateEntity, (workout) => workout.exercises, {
    onDelete: 'CASCADE',
  })
  workout!: WorkoutTemplateEntity;

  @ManyToOne(() => ExerciseEntity, {
    nullable: false,
  })
  exercise!: ExerciseEntity;

  @Column({
    nullable: true,
  })
  note?: string;

  @OneToMany(
    () => WorkoutTemplateSetEntity,
    (set) => set.workoutTemplateExercise,
    {
      cascade: true,
    },
  )
  sets!: WorkoutTemplateSetEntity[];
}
