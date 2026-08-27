import {
  AppFieldArray,
  AppForm,
  AppInput,
  AppNumberInput,
} from "@/common/components/form";
import { useExercises } from "@/features/exercises";
import {
  createWorkoutTemplateSchema,
  type WorkoutTemplateFormValues,
  type WorkoutTemplateInitialFormValues,
} from "../schemas/create-workout-template.schema";
import { Alert, Badge, Box, Button, Card, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import ExercisePicker from "../components/ExercisePicker";
import useDebounce from "@/common/hooks/useDebounce";
import { Loader } from "@/common/components";
import type { ExercisePartial } from "@/features/exercises/schemas/exercise.schema";
import { RxPlus } from "react-icons/rx";

type Props = {
  onSubmit: (values: WorkoutTemplateFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: Error | null;
  initialValues?: WorkoutTemplateInitialFormValues;
};

function WorkoutTemplateForm({
  onSubmit,
  isSubmitting,
  error,
  initialValues,
}: Props) {
  const [nameSearch, setNameSearch] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<ExercisePartial[]>(
    [],
  );
  const debouncedSearch = useDebounce(nameSearch, 300);
  const {
    data: exercises,
    isPending,
    error: exercisesError,
  } = useExercises({ name: debouncedSearch });

  function handleSelect(
    addItem: (args: WorkoutTemplateFormValues["exercises"][number]) => void,
    itemId: string,
  ) {
    setTimeout(() => setNameSearch(""), 0);
    if (!itemId) return;

    const exercise = exercises?.items.find(
      (exercise) => exercise.id === itemId,
    );

    if (!exercise) return;
    setSelectedExercises((prev) => [...prev, exercise]);

    addItem({
      exerciseId: itemId,
      note: "",
      sets: [
        {
          order: 1,
          reps: null,
          weight: null,
          rir: null,
          rm: null,
          rest: null,
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
    <AppForm
      schema={createWorkoutTemplateSchema}
      onSubmit={onSubmit}
      defaultValues={initialValues}
    >
      <Stack gap={8}>
        <Card.Root w={"full"}>
          <Card.Body>
            <AppInput<WorkoutTemplateFormValues> name="name" label="Name" />
          </Card.Body>
        </Card.Root>

        <AppFieldArray<WorkoutTemplateFormValues, "exercises">
          name="exercises"
          renderAppendButton={(addItem) => (
            <ExercisePicker
              selectedExercises={selectedExercises}
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

            return (
              <Card.Root w={"full"}>
                <Card.Header>
                  <Stack align={"start"} direction={"row"} gap={4}>
                    <Badge
                      colorPalette={"brand"}
                      size={"lg"}
                      variant={"solid"}
                      fontWeight={"semibold"}
                    >
                      {idx + 1}
                    </Badge>
                    <Text fontWeight={"semibold"}>
                      {exercise?.name
                        ? exercise.name
                        : initialValues?.exercises[idx].name}
                    </Text>
                  </Stack>
                </Card.Header>
                <Card.Body gap={4}>
                  <Stack gap={4}>
                    <AppInput<WorkoutTemplateFormValues>
                      name={`exercises.${idx}.note`}
                      label="Note"
                      required={false}
                    />
                  </Stack>
                  <AppFieldArray<
                    WorkoutTemplateFormValues,
                    `exercises.${number}.sets`
                  >
                    name={`exercises.${idx}.sets`}
                    renderAppendButton={(addItem, length) => (
                      <Box borderTopWidth={"1px"} mt={8} py={8}>
                        <Button
                          w={"full"}
                          fontWeight={"semibold"}
                          type="button"
                          variant={"subtle"}
                          size={"lg"}
                          onClick={() =>
                            addItem({
                              order: length + 1,
                              reps: null,
                              weight: null,
                              rir: null,
                              rm: null,
                              rest: null,
                            })
                          }
                        >
                          <RxPlus /> Add set
                        </Button>
                      </Box>
                    )}
                    renderItem={(setIndex) => {
                      return (
                        <Stack direction={"row"} alignItems={"start"} gap={8}>
                          <Badge
                            colorPalette={"brand"}
                            size={"sm"}
                            variant={"solid"}
                            fontWeight={"semibold"}
                          >
                            {setIndex + 1}. Set
                          </Badge>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap={8}
                          >
                            <AppNumberInput<WorkoutTemplateFormValues>
                              label="Target Reps"
                              required={false}
                              name={`exercises.${idx}.sets.${setIndex}.reps`}
                            />
                            <AppNumberInput<WorkoutTemplateFormValues>
                              label="Target Weight"
                              required={false}
                              name={`exercises.${idx}.sets.${setIndex}.weight`}
                            />
                            <AppNumberInput<WorkoutTemplateFormValues>
                              label="Target RIR"
                              required={false}
                              name={`exercises.${idx}.sets.${setIndex}.rir`}
                            />
                            <AppNumberInput<WorkoutTemplateFormValues>
                              label="Target RM%"
                              required={false}
                              name={`exercises.${idx}.sets.${setIndex}.rm`}
                            />
                            <AppNumberInput<WorkoutTemplateFormValues>
                              label="Rest"
                              required={false}
                              name={`exercises.${idx}.sets.${setIndex}.rest`}
                            />
                          </Stack>
                        </Stack>
                      );
                    }}
                  />
                </Card.Body>
              </Card.Root>
            );
          }}
        />

        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{error.message}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )}
        <Box>
          <Button
            type="submit"
            size={"lg"}
            fontWeight={"semibold"}
            loading={isSubmitting}
            colorPalette={"brand"}
          >
            Save Template
          </Button>
        </Box>
      </Stack>
    </AppForm>
  );
}

export default WorkoutTemplateForm;
