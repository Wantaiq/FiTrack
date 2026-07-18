import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type {
  Difficulty,
  ExerciseType,
  Mechanic,
} from '../schemas/exercise.schema';
import {
  filterExercisesSchema,
  type FilterExercises,
} from '../schemas/filter-exercise.schema';

function useExerciseFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () =>
      filterExercisesSchema.parse({
        name: searchParams.get('name') ?? '',
        difficulty: searchParams.get('difficulty') ?? undefined,
        type: searchParams.get('type') ?? undefined,
        mechanic: searchParams.get('mechanic') ?? undefined,
        page: Number(searchParams.get('page') ?? 1),
      }),
    [searchParams],
  );

  const update = useCallback(
    (updates: Partial<FilterExercises>) => {
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

  const setDifficulty = useCallback(
    (difficulty?: Difficulty) => {
      update({
        difficulty,
        page: 1,
      });
    },
    [update],
  );

  const setType = useCallback(
    (type?: ExerciseType) => {
      update({
        type,
        page: 1,
      });
    },
    [update],
  );

  const setMechanic = useCallback(
    (mechanic?: Mechanic) => {
      update({
        mechanic,
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
    setDifficulty,
    setType,
    setMechanic,
    setPage,
    clearFilters,
  };
}

export default useExerciseFilters;
