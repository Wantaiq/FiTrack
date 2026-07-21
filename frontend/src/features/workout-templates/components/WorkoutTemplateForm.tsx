import { AppFieldArray, AppForm, AppInput } from '@/common/components/form';
import { useExercises } from '@/features/exercises';
import {
  createWorkoutTemplateSchema,
  type CreateWorkoutTemplateFormValues,
} from '../schemas/create-workout-template.schema';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import type { Exercise } from '@/features/exercises/schemas/exercise.schema';
import ExercisePicker from '../components/ExercisePicker';
import useDebounce from '@/common/hooks/useDebounce';
import { Loader } from '@/common/components';

type Props = {
  onSubmit: (values: CreateWorkoutTemplateFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: Error | null;
};

function WorkoutTemplateForm({ onSubmit, isSubmitting, error }: Props) {
  const [nameSearch, setNameSearch] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const debouncedSearch = useDebounce(nameSearch, 300);
  const {
    data: exercises,
    isPending,
    error: exercisesError,
  } = useExercises({ name: debouncedSearch });

  function handleSelect(
    addItem: (
      args: CreateWorkoutTemplateFormValues['exercises'][number],
    ) => void,
    itemId: string,
  ) {
    setNameSearch('');
    if (!itemId) return;

    const exercise = exercises?.items.find(
      (exercise) => exercise.id === itemId,
    );

    if (!exercise) return;
    setSelectedExercises((prev) => [...prev, exercise]);

    addItem({
      exerciseId: itemId,
      note: '',
      sets: [
        {
          order: 1,
          targetReps: 10,
          targetWeight: 30,
        },
      ],
    });
  }

  function handleInputChange(inputValue: string) {
    setNameSearch(inputValue);
  }

  if (isPending) {
    return <Loader />;
  }

  if (exercisesError) {
    return <p>Something went wrong</p>;
  }

  return (
    <AppForm schema={createWorkoutTemplateSchema} onSubmit={onSubmit}>
      <AppInput<CreateWorkoutTemplateFormValues> name="name" label="Name" />
      <AppFieldArray<CreateWorkoutTemplateFormValues, 'exercises'>
        name="exercises"
        renderAppendButton={(addItem) => (
          <ExercisePicker
            onSelect={(value: string) => handleSelect(addItem, value)}
            exercises={exercises.items}
            inputValue={nameSearch}
            onInputChange={handleInputChange}
          />
        )}
        renderItem={(idx, field) => {
          const exercise = selectedExercises.find((item) => {
            return item.id === field.exerciseId;
          });

          if (!exercise) return;
          return (
            <>
              <h1>{exercise.name}</h1>
              <AppInput<CreateWorkoutTemplateFormValues>
                name={`exercises.${idx}.note`}
                label="Note"
                required={false}
              />
              <AppFieldArray<
                CreateWorkoutTemplateFormValues,
                `exercises.${number}.sets`
              >
                name={`exercises.${idx}.sets`}
                renderAppendButton={(addItem, length) => (
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        order: length + 1,
                        targetReps: 8,
                        targetWeight: 3,
                      })
                    }
                  >
                    Add
                  </button>
                )}
                renderItem={(setIndex) => {
                  return (
                    <>
                      <AppInput<CreateWorkoutTemplateFormValues>
                        label="Target Reps"
                        name={`exercises.${idx}.sets.${setIndex}.targetReps`}
                      />
                      <AppInput<CreateWorkoutTemplateFormValues>
                        label="Target Weight"
                        name={`exercises.${idx}.sets.${setIndex}.targetWeight`}
                      />
                    </>
                  );
                }}
              />
            </>
          );
        }}
      />
      <Button type="submit" loading={isSubmitting}>
        Submit
      </Button>
    </AppForm>
  );
}

export default WorkoutTemplateForm;
