import { useSearchParams } from 'react-router';
import {
  filterExercisesSchema,
  type FilterExercises,
} from '../schemas/filter-exercise.schema';

export function useExerciseFilters() {
  const [params, setParams] = useSearchParams();

  const filters = filterExercisesSchema.parse({
    name: params.get('name') || undefined,
    difficulty: params.get('difficulty') || undefined,
    type: params.get('type') || undefined,
    mechanic: params.get('mechanic') || undefined,
    page: params.get('page') || 1,
  });

  function updateFilters(values: Partial<FilterExercises>) {
    const filtered = {
      ...filters,
      ...values,
    };

    const params = new URLSearchParams();

    Object.entries(filtered).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== 1) {
        params.set(key, String(value));
      }
    });

    setParams(params);
  }

  return {
    filters,
    updateFilters,
  };
}
