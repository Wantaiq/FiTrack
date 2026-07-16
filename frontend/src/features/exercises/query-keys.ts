import type { FilterExercises } from './schemas/filter-exercise.schema';

const exerciseQueryKeys = {
  all: ['exercises'] as const,
  list: (filters: FilterExercises) =>
    [...exerciseQueryKeys.all, 'list', filters] as const,
};

export default exerciseQueryKeys;
