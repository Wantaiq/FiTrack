import { Exercise } from '../../exercise/entities/exercise.entity';
import { User } from '../../user/entities/user.entity';
import { CreateWorkoutTemplateExerciseSetDto } from '../dto/create-workout-template-exercise-set.dto';
import { CreateWorkoutTemplateExerciseDto } from '../dto/create-workout-template-exercise.dto';
import { CreateWorkoutTemplateDto } from '../dto/create-workout-template.dto';
import { UpdateWorkoutTemplateDto } from '../dto/update-workout-template.dto';
import { WorkoutTemplateExercise } from '../entities/workout-template-exercise.entity';
import { WorkoutTemplateSet } from '../entities/workout-template-set.entity';
import { WorkoutTemplate } from '../entities/workout-template.entity';

export class WorkoutTemplateMapper {
  static toEntity(
    userId: string,
    dto: CreateWorkoutTemplateDto,
    foundExercises: Exercise[],
  ): WorkoutTemplate {
    const template = new WorkoutTemplate();
    template.name = dto.name;
    template.createdBy = { id: userId } as User;
    template.exercises = dto.exercises.map((exerciseDto, i) =>
      this.buildExercise(exerciseDto, foundExercises),
    );

    return template;
  }

  static updateEntity(
    template: WorkoutTemplate,
    dto: UpdateWorkoutTemplateDto,
    foundExercises: Exercise[],
  ): WorkoutTemplate {
    template.name = dto.name;
    template.exercises = dto.exercises.map((exerciseDto) =>
      this.buildExercise(exerciseDto, foundExercises),
    );

    return template;
  }

  private static buildExercise(
    exerciseDto: CreateWorkoutTemplateExerciseDto,
    exercises: Exercise[],
  ): WorkoutTemplateExercise {
    const workoutExercise = new WorkoutTemplateExercise();
    workoutExercise.exercise = exercises.find(
      (e) => e.id === exerciseDto.exerciseId,
    )!;
    workoutExercise.note = exerciseDto.note;
    workoutExercise.sets = exerciseDto.sets.map((s) => this.buildSet(s));

    return workoutExercise;
  }

  private static buildSet(
    dto: CreateWorkoutTemplateExerciseSetDto,
  ): WorkoutTemplateSet {
    const set = new WorkoutTemplateSet();
    set.order = dto.order;
    set.reps = dto.reps ?? null;
    set.rest = dto.rest ?? null;
    set.rm = dto.rm ?? null;
    set.rir = dto.rir ?? null;

    return set;
  }
}
