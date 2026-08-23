import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutTemplateExercise } from './workout-template-exercise.entity';

@Entity('workout_template_sets')
export class WorkoutTemplateSet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => WorkoutTemplateExercise,
    (workoutExercise) => workoutExercise.sets,
    {
      onDelete: 'CASCADE',
    },
  )
  workoutTemplateExercise!: WorkoutTemplateExercise;

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
