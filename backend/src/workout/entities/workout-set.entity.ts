import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutExerciseEntity } from './workout-exercise.entity';

@Entity('workout_sets')
export class WorkoutSetEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(
    () => WorkoutExerciseEntity,
    (workoutExercise) => workoutExercise.sets,
    {
      onDelete: 'CASCADE',
    },
  )
  workoutExercise!: WorkoutExerciseEntity;

  @Column()
  order!: number;

  @Column({
    type: 'decimal',
  })
  weight!: number;

  @Column()
  reps!: number;

  @Column({
    default: false,
  })
  completed?: boolean;
}
