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
    scheduledAt: Date,
  ): WorkoutSessionEntity {
    const session = new WorkoutSessionEntity();

    session.createdBy = { id: userId } as UserEntity;
    session.template = template;
    session.scheduledAt = new Date(scheduledAt);

    session.exercises = template.exercises.map((templateExercise) =>
      this.mapExercise(templateExercise, session),
    );

    return session;
  }

  private static mapExercise(
    templateExercise: WorkoutTemplateExerciseEntity,
    session: WorkoutSessionEntity,
  ): WorkoutSessionExerciseEntity {
    const sessionExercise = new WorkoutSessionExerciseEntity();

    sessionExercise.session = session;
    sessionExercise.exercise = templateExercise.exercise;

    sessionExercise.order = templateExercise.order;
    sessionExercise.note = templateExercise.note;

    sessionExercise.sets = templateExercise.sets.map((templateSet) =>
      this.mapSet(templateSet, sessionExercise),
    );

    return sessionExercise;
  }

  private static mapSet(
    templateSet: WorkoutTemplateSetEntity,
    sessionExercise: WorkoutSessionExerciseEntity,
  ): WorkoutSessionSetEntity {
    const sessionSet = new WorkoutSessionSetEntity();

    sessionSet.exercise = sessionExercise;
    sessionSet.order = templateSet.order;
    sessionSet.weight = null;
    sessionSet.reps = null;
    sessionSet.completed = false;

    return sessionSet;
  }
}
