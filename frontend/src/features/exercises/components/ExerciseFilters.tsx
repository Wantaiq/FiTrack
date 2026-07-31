import {
  Button,
  CloseButton,
  HStack,
  Input,
  InputGroup,
  NativeSelect,
} from '@chakra-ui/react';
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
    <HStack>
      <InputGroup
        flex={4}
        endElement={
          filters.name && (
            <CloseButton
              aria-label="Clear search"
              size={'xs'}
              onClick={() => setName('')}
            />
          )
        }
      >
        <Input
          placeholder="Search"
          value={filters.name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>

      <NativeSelect.Root flex={1}>
        <NativeSelect.Indicator />
        <NativeSelect.Field
          value={filters.difficulty || ''}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          <option value="">All difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </NativeSelect.Field>
      </NativeSelect.Root>

      <NativeSelect.Root flex={1}>
        <NativeSelect.Indicator />
        <NativeSelect.Field
          value={filters.type || ''}
          onChange={(e) => setType(e.target.value as ExerciseType)}
        >
          <option value="">All types</option>
          <option value="strength">Strength</option>
          <option value="cardio">Cardio</option>
          <option value="stretch">Stretch</option>
          <option value="plyometric">Plyometric</option>
          <option value="isometric">Isometric</option>
        </NativeSelect.Field>
      </NativeSelect.Root>

      <NativeSelect.Root flex={1}>
        <NativeSelect.Indicator />
        <NativeSelect.Field
          value={filters.mechanic || ''}
          onChange={(e) => setMechanic(e.target.value as Mechanic)}
        >
          <option value="">All mechanics</option>
          <option value="compound">Compound</option>
          <option value="isolation">Isolation</option>
        </NativeSelect.Field>
      </NativeSelect.Root>
      <Button
        onClick={() => clearFilters()}
        boxSizing={'content-box'}
        variant="outline"
      >
        Reset filters
      </Button>
    </HStack>
  );
}
