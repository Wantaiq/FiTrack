import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutSessionExerciseEntity } from './workout-session-exercise.entity';

@Entity('workout_session_sets')
export class WorkoutSessionSetEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => WorkoutSessionExerciseEntity, (exercise) => exercise.sets, {
    onDelete: 'CASCADE',
  })
  exercise!: WorkoutSessionExerciseEntity;

  @Column()
  order!: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 2,
    nullable: true,
  })
  weight!: number | null;

  @Column({
    type: 'integer',
    nullable: true,
  })
  reps!: number | null;

  @Column({
    default: false,
  })
  completed!: boolean;
}
