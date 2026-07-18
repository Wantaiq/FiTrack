import { Button, Input, NativeSelect } from '@chakra-ui/react';
import useExerciseFilters from '../hooks/useExerciseFilters';
import type {
  Difficulty,
  ExerciseType,
  Mechanic,
} from '../schemas/exercise.schema';

export function ExerciseFilters() {
  const {
    filters,
    setName,
    setDifficulty,
    setType,
    clearFilters,
    setMechanic,
  } = useExerciseFilters();

  return (
    <>
      <Input
        placeholder="bench press"
        value={filters.name}
        onChange={(e) => setName(e.target.value)}
      />

      <NativeSelect.Root>
        <NativeSelect.Field
          value={filters.difficulty || ''}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
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
          onChange={(e) => setType(e.target.value as ExerciseType)}
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
          onChange={(e) => setMechanic(e.target.value as Mechanic)}
        >
          <option value="">Mechanic</option>
          <option value="compound">Compound</option>
          <option value="isolation">Isolation</option>
        </NativeSelect.Field>
      </NativeSelect.Root>
      <Button onClick={() => clearFilters()}>Clear all</Button>
    </>
  );
}
