import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Difficulty,
  ExerciseType,
  MechanicType,
} from '../enums/exercise.types';
import { ExerciseInstruction } from './exercise-instruction.entity';
import { User } from '../../user/entities/user.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ length: 100 })
  name!: string;

  @Column('text')
  description!: string;

  @OneToMany(() => ExerciseInstruction, (instruction) => instruction.exercise, {
    orphanedRowAction: 'delete',
    cascade: true,
  })
  instructions!: ExerciseInstruction[];

  @Index()
  @Column({
    type: 'enum',
    enum: ExerciseType,
  })
  type!: ExerciseType;

  @Index()
  @Column({
    type: 'enum',
    enum: Difficulty,
  })
  difficulty!: Difficulty;

  @Index()
  @Column({
    type: 'enum',
    enum: MechanicType,
  })
  mechanic!: MechanicType;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  createdBy!: User | null;
}
