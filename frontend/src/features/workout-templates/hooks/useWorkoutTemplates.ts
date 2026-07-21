import { keepPreviousData, useQuery } from '@tanstack/react-query';
import workoutTemplateQueryKeys from '../query-keys';
import getWorkoutTemplates from '../api/get-workout-templates';
import type { FilterWorkoutTemplates } from '../schemas/filter-workout-templates.schema';

function useWorkoutTemplates(filters: FilterWorkoutTemplates) {
  return useQuery({
    queryKey: workoutTemplateQueryKeys.list(filters),
    queryFn: () => getWorkoutTemplates(filters),
    placeholderData: keepPreviousData,
  });
}

export default useWorkoutTemplates;
