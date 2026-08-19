import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutTemplateExerciseEntity } from './workout-template-exercise.entity';

@Entity('workout_template_sets')
export class WorkoutTemplateSetEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => WorkoutTemplateExerciseEntity,
    (workoutExercise) => workoutExercise.sets,
    {
      onDelete: 'CASCADE',
    },
  )
  workoutTemplateExercise!: WorkoutTemplateExerciseEntity;

  @Column({ type: 'integer' })
  order!: number;

  @Column({
    type: 'integer',
    nullable: true,
    default: null,
  })
  reps!: number;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  weight!: number | null;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  rir!: number | null;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  rm!: number | null;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  rest!: number | null;
}
