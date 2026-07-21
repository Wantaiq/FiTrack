import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import {
  filterWorkoutTemplatesSchema,
  type FilterWorkoutTemplates,
} from '../schemas/filter-workout-templates.schema';

function useWorkoutTemplatesFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () =>
      filterWorkoutTemplatesSchema.parse({
        name: searchParams.get('name') ?? '',
        page: Number(searchParams.get('page') ?? 1),
      }),
    [searchParams],
  );

  const update = useCallback(
    (updates: Partial<FilterWorkoutTemplates>) => {
      const next = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === '' || value === 1) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      setSearchParams(next);
    },
    [searchParams, setSearchParams],
  );

  const setName = useCallback(
    (name: string) => {
      update({
        name: name || undefined,
        page: 1,
      });
    },
    [update],
  );

  const setPage = useCallback(
    (page: number) => {
      update({ page });
    },
    [update],
  );

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  return {
    filters,
    setName,
    setPage,
    clearFilters,
  };
}

export default useWorkoutTemplatesFilters;
