import type { FilterExercises } from './schemas/filter-exercise.schema';

const exerciseQueryKeys = {
  all: ['exercises'] as const,
  lists: () => [...exerciseQueryKeys.all, 'lists'] as const,
  list: (filters: FilterExercises) =>
    [...exerciseQueryKeys.lists(), 'list', filters] as const,
  detail: (id: string) => [...exerciseQueryKeys.all, 'detail', id] as const,
};

export default exerciseQueryKeys;
