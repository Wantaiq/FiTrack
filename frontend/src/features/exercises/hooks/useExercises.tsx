import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { FilterExercises } from '../schemas/filter-exercise.schema';
import exerciseQueryKeys from '../query-keys';
import getExercises from '../api/exercises';

function useExercises(filters: FilterExercises) {
  return useQuery({
    queryKey: exerciseQueryKeys.list(filters),
    queryFn: () => getExercises(filters),
    placeholderData: keepPreviousData,
  });
}

export default useExercises;
