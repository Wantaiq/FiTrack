import { Button, Input, NativeSelect } from '@chakra-ui/react';
import useExerciseFilters from '../hooks/useExerciseFilters';
import type {
  Difficulty,
  ExerciseType,
  Mechanic,
} from '../schemas/exercise.schema';

export function ExerciseFilters() {
  const { filters, updateFilters } = useExerciseFilters();

  return (
    <>
      <Input
        placeholder="bench press"
        value={filters.name}
        onChange={(e) =>
          updateFilters({
            name: e.target.value,
            page: 1,
          })
        }
      />

      <NativeSelect.Root>
        <NativeSelect.Field
          value={filters.difficulty || ''}
          onChange={(e) =>
            updateFilters({
              difficulty: (e.target.value as Difficulty) || undefined,
              page: 1,
            })
          }
        >
          <option value="">Difficulty</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </NativeSelect.Field>
      </NativeSelect.Root>

      <NativeSelect.Root>
        <NativeSelect.Field
          value={filters.type || ''}
          onChange={(e) =>
            updateFilters({
              type: (e.target.value as ExerciseType) || undefined,
              page: 1,
            })
          }
        >
          <option value="">Type</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="stretch">Stretch</option>
          <option value="plyometric">Plyometric</option>
          <option value="isometric">Isometric</option>
        </NativeSelect.Field>
      </NativeSelect.Root>

      <NativeSelect.Root>
        <NativeSelect.Field
          value={filters.mechanic || ''}
          onChange={(e) =>
            updateFilters({
              mechanic: (e.target.value as Mechanic) || undefined,
              page: 1,
            })
          }
        >
          <option value="">Mechanic</option>
          <option value="compound">Compound</option>
          <option value="isolation">Isolation</option>
        </NativeSelect.Field>
      </NativeSelect.Root>
      <Button
        onClick={() =>
          updateFilters({
            page: 1,
            difficulty: undefined,
            name: '',
            mechanic: undefined,
            type: undefined,
          })
        }
      >
        Clear all
      </Button>
    </>
  );
}
