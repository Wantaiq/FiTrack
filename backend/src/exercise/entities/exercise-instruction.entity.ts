import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity('exercise_instruction')
export class ExerciseInstruction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.instructions, {
    onDelete: 'CASCADE',
  })
  exercise!: Exercise;

  @Column()
  order!: number;

  @Column({ length: 100 })
  title!: string;

  @Column('text')
  text!: string;
}
