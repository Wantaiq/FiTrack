import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkoutSessionExercise } from './workout-session-exercise.entity';

@Entity('workout_session_sets')
export class WorkoutSessionSet {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => WorkoutSessionExercise, (exercise) => exercise.sets, {
    onDelete: 'CASCADE',
  })
  exercise!: WorkoutSessionExercise;

  @Column()
  order!: number;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  weight: number | null = null;

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

  @Column({
    type: 'integer',
    nullable: true,
    default: null,
  })
  reps: number | null = null;

  @Column({
    default: false,
  })
  completed: boolean = false;
}
