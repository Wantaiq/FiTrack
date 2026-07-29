import {
  AppForm,
  AppInput,
  AppTextarea,
  AppSelect,
  AppFieldArray,
} from '@/common/components/form';
import {
  type Difficulty,
  type ExerciseType,
  type Mechanic,
} from '../schemas/exercise.schema';
import { Alert, Button } from '@chakra-ui/react';
import {
  createExerciseSchema,
  type CreateExerciseFormValues,
} from '../schemas/create-exercise.schema';

type Props = {
  onSubmit: (values: CreateExerciseFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: Error | null;
};

function CreateExerciseForm({ onSubmit, isSubmitting, error }: Props) {
  return (
    <AppForm
      schema={createExerciseSchema}
      onSubmit={onSubmit}
      defaultValues={{
        instructions: [{ title: '', text: '', order: 1 }],
        difficulty: 'beginner',
        type: 'strength',
        mechanic: 'compound',
      }}
    >
      <AppInput<CreateExerciseFormValues>
        name="name"
        type="text"
        label="Name"
        placeholder="Bench Press"
      />
      <AppTextarea<CreateExerciseFormValues>
        name="description"
        label="Description"
      />
      <AppFieldArray<CreateExerciseFormValues, 'instructions'>
        name="instructions"
        renderAppendButton={(addItem, length) => (
          <button
            type="button"
            onClick={() => addItem({ order: length + 1, title: '', text: '' })}
          >
            Add
          </button>
        )}
        renderItem={(idx) => {
          return (
            <>
              <AppInput<CreateExerciseFormValues>
                name={`instructions.${idx}.title`}
                label="Title"
              />
              <AppInput name={`instructions.${idx}.text`} label="Instruction" />
            </>
          );
        }}
      />

      <AppSelect<CreateExerciseFormValues, Difficulty>
        label="Difficulty"
        name="difficulty"
        options={
          [
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
          ] as const
        }
      />

      <AppSelect<CreateExerciseFormValues, Mechanic>
        label="Mechanic"
        name="mechanic"
        options={
          [
            { value: 'compound', label: 'Compound' },
            { value: 'isolation', label: 'Isolation' },
          ] as const
        }
      />
      <AppSelect<CreateExerciseFormValues, ExerciseType>
        label="Type"
        name="type"
        options={
          [
            { value: 'strength', label: 'Strength' },
            { value: 'cardio', label: 'Cardio' },
            { value: 'stretch', label: 'Stretch' },
            { value: 'plyometric', label: 'Plyometric' },
            { value: 'isometric', label: 'Isometric' },
          ] as const
        }
      />
      <Button type="submit" loading={isSubmitting}>
        Create
      </Button>
      {error && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{error.message}</Alert.Title>
          </Alert.Content>
        </Alert.Root>
      )}
    </AppForm>
  );
}

export default CreateExerciseForm;
