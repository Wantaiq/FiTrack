import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExerciseEntity } from './exercise.entity';

@Entity('exercise_instruction')
export class ExerciseInstructionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => ExerciseEntity, (exercise) => exercise.instructions, {
    onDelete: 'CASCADE',
  })
  exercise!: ExerciseEntity;

  @Column()
  order!: number;

  @Column({ length: 100 })
  title!: string;

  @Column('text')
  text!: string;
}
