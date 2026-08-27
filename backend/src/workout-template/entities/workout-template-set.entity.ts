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
  reps: number | null = null;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  rir: number | null = null;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  rm: number | null = null;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  rest: number | null = null;
}
