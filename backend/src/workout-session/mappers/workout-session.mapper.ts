import { WorkoutSession } from '../entities/workout-session.entity';
import { WorkoutSessionExercise } from '../entities/workout-session-exercise.entity';
import { WorkoutSessionSet } from '../entities/workout-session-set.entity';
import { WorkoutTemplate } from '../../workout-template/entities/workout-template.entity';
import { User } from '../../user/entities/user.entity';
import { WorkoutTemplateExercise } from '../../workout-template/entities/workout-template-exercise.entity';
import { WorkoutTemplateSet } from '../../workout-template/entities/workout-template-set.entity';

export class WorkoutSessionMapper {
  static fromTemplate(
    template: WorkoutTemplate,
    userId: string,
    scheduledAt: string,
  ): WorkoutSession {
    const session = new WorkoutSession();

    session.createdBy = { id: userId } as User;
    session.template = template;
    session.scheduledAt = scheduledAt;

    session.exercises = template.exercises.map((templateExercise) =>
      this.mapExercise(templateExercise),
    );

    return session;
  }

  private static mapExercise(
    templateExercise: WorkoutTemplateExercise,
  ): WorkoutSessionExercise {
    const sessionExercise = new WorkoutSessionExercise();

    sessionExercise.exercise = templateExercise.exercise;
    sessionExercise.note = templateExercise.note;

    sessionExercise.sets = templateExercise.sets.map((templateSet) =>
      this.mapSet(templateSet),
    );

    return sessionExercise;
  }

  private static mapSet(templateSet: WorkoutTemplateSet): WorkoutSessionSet {
    const sessionSet = new WorkoutSessionSet();

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
