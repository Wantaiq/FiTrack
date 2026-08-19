import { WorkoutSessionEntity } from '../entities/workout-session.entity';
import { WorkoutSessionExerciseEntity } from '../entities/workout-session-exercise.entity';
import { WorkoutSessionSetEntity } from '../entities/workout-session-set.entity';
import { WorkoutTemplateEntity } from '../../workout-template/entities/workout-template.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { WorkoutTemplateExerciseEntity } from '../../workout-template/entities/workout-template-exercise.entity';
import { WorkoutTemplateSetEntity } from '../../workout-template/entities/workout-template-set.entity';

export class WorkoutSessionMapper {
  static fromTemplate(
    template: WorkoutTemplateEntity,
    userId: string,
    scheduledAt: string,
  ): WorkoutSessionEntity {
    const session = new WorkoutSessionEntity();

    session.createdBy = { id: userId } as UserEntity;
    session.template = template;
    session.scheduledAt = scheduledAt;

    session.exercises = template.exercises.map((templateExercise) =>
      this.mapExercise(templateExercise),
    );

    return session;
  }

  private static mapExercise(
    templateExercise: WorkoutTemplateExerciseEntity,
  ): WorkoutSessionExerciseEntity {
    const sessionExercise = new WorkoutSessionExerciseEntity();

    sessionExercise.exercise = templateExercise.exercise;
    sessionExercise.note = templateExercise.note;

    sessionExercise.sets = templateExercise.sets.map((templateSet) =>
      this.mapSet(templateSet),
    );

    return sessionExercise;
  }

  private static mapSet(
    templateSet: WorkoutTemplateSetEntity,
  ): WorkoutSessionSetEntity {
    const sessionSet = new WorkoutSessionSetEntity();

    sessionSet.order = templateSet.order;
    sessionSet.weight = templateSet.weight;
    sessionSet.reps = templateSet.reps;
    sessionSet.rir = templateSet.rir;
    sessionSet.rm = templateSet.rm;
    sessionSet.rest = templateSet.rest;

    sessionSet.completed = false;

    return sessionSet;
  }
}
