import type { FilterWorkoutSessions } from './schemas/filter-workout-session.schema';

const workoutSessionQueryKeys = {
  all: ['workout-templates'] as const,
  lists: () => [...workoutSessionQueryKeys.all, 'lists'] as const,
  list: (filters: FilterWorkoutSessions) =>
    [...workoutSessionQueryKeys.lists(), 'list', filters] as const,
};

export default workoutSessionQueryKeys;
