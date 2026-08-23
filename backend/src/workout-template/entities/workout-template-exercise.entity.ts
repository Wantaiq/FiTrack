import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkoutTemplate } from './workout-template.entity';
import { Exercise } from '../../exercise/entities/exercise.entity';
import { WorkoutTemplateSet } from './workout-template-set.entity';

@Entity('workout_template_exercises')
export class WorkoutTemplateExercise {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => WorkoutTemplate, (workout) => workout.exercises, {
    onDelete: 'CASCADE',
  })
  workout!: WorkoutTemplate;

  @ManyToOne(() => Exercise, {
    nullable: false,
  })
  exercise!: Exercise;

  @Column({
    nullable: true,
    type: 'text',
    default: null,
  })
  note: string | null = null;

  @OneToMany(() => WorkoutTemplateSet, (set) => set.workoutTemplateExercise, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  sets!: WorkoutTemplateSet[];
}
