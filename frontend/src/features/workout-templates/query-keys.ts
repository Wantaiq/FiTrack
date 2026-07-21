import type { FilterWorkoutTemplates } from './schemas/filter-workout-templates.schema';

const workoutTemplateQueryKeys = {
  all: ['workout-templates'] as const,
  lists: () => [...workoutTemplateQueryKeys.all, 'lists'] as const,
  list: (filters: FilterWorkoutTemplates) =>
    [...workoutTemplateQueryKeys.lists(), 'list', filters] as const,
  detail: (id: string) =>
    [...workoutTemplateQueryKeys.all, 'detail', id] as const,
};

export default workoutTemplateQueryKeys;
