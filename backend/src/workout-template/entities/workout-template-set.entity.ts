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
  })
  targetReps!: number;

  @Column({
    type: 'integer',
  })
  targetWeight!: number;
}
