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

  @Column({
    type: 'integer',
    nullable: true,
    default: null,
  })
  reps!: number | null;

  @Column({
    default: false,
  })
  completed!: boolean;
}
