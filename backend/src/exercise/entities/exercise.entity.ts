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
import { ExerciseInstructionEntity } from './exercise-instruction.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('exercises')
export class ExerciseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ length: 100 })
  name!: string;

  @Column('text', { nullable: true })
  description?: string;

  @OneToMany(
    () => ExerciseInstructionEntity,
    (instruction) => instruction.exercise,
    {
      cascade: true,
    },
  )
  instructions!: ExerciseInstructionEntity[];

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
    nullable: true,
  })
  difficulty?: Difficulty;

  @Index()
  @Column({
    type: 'enum',
    enum: MechanicType,
    nullable: true,
  })
  mechanic?: MechanicType;

  @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
  createdBy!: UserEntity | null;
}
