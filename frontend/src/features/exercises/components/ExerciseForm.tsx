import {
  AppForm,
  AppInput,
  AppTextarea,
  AppSelect,
  AppFieldArray,
} from "@/common/components/form";
import {
  type Difficulty,
  type ExerciseType,
  type Mechanic,
} from "../schemas/exercise.schema";
import { Alert, Badge, Box, Button, Card, Flex, Stack } from "@chakra-ui/react";
import {
  exerciseFormSchema,
  type ExerciseFormValues,
} from "../schemas/create-exercise.schema";

type Props = {
  onSubmit: (values: ExerciseFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: Error | null;
  initialValues?: ExerciseFormValues;
};

function ExerciseForm({ onSubmit, isSubmitting, error, initialValues }: Props) {
  return (
    <AppForm
      schema={exerciseFormSchema}
      onSubmit={onSubmit}
      defaultValues={
        initialValues || {
          instructions: [{ title: "", text: "", order: 1 }],
          difficulty: "beginner",
          type: "strength",
          mechanic: "compound",
        }
      }
    >
      <Stack gap={8}>
        <Card.Root w={"full"}>
          <Card.Body>
            <Flex direction={"column"} gap={6}>
              <AppInput<ExerciseFormValues>
                name="name"
                type="text"
                label="Exercise name"
                placeholder="e.g. Bench Press"
              />
              <AppTextarea<ExerciseFormValues>
                name="description"
                label="Description"
                placeholder="Brief overview of exercise"
              />
            </Flex>
          </Card.Body>
        </Card.Root>

        <Card.Root w={"full"}>
          <Card.Header>
            <Card.Title as={"h2"}>Classification</Card.Title>
          </Card.Header>
          <Card.Body>
            <Flex gap={4}>
              <AppSelect<ExerciseFormValues, Difficulty>
                label="Difficulty"
                name="difficulty"
                options={
                  [
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" },
                  ] as const
                }
              />

              <AppSelect<ExerciseFormValues, Mechanic>
                label="Mechanic"
                name="mechanic"
                options={
                  [
                    { value: "compound", label: "Compound" },
                    { value: "isolation", label: "Isolation" },
                  ] as const
                }
              />
              <AppSelect<ExerciseFormValues, ExerciseType>
                label="Type"
                name="type"
                options={
                  [
                    { value: "strength", label: "Strength" },
                    { value: "cardio", label: "Cardio" },
                    { value: "stretch", label: "Stretch" },
                    { value: "plyometric", label: "Plyometric" },
                    { value: "isometric", label: "Isometric" },
                  ] as const
                }
              />
            </Flex>
          </Card.Body>
        </Card.Root>

        <Card.Root w="full">
          <Card.Header>
            <Card.Title as={"h2"}>Instructions</Card.Title>
            <Card.Description>Provide steps for exercise</Card.Description>
          </Card.Header>
          <Card.Body>
            <AppFieldArray<ExerciseFormValues, "instructions">
              name="instructions"
              renderAppendButton={(addItem, length) => (
                <Box borderTopWidth={"1px"} mt={8} py={8}>
                  <Button
                    w={"full"}
                    fontWeight={"semibold"}
                    type="button"
                    variant={"subtle"}
                    size={"lg"}
                    onClick={() =>
                      addItem({ order: length + 1, title: "", text: "" })
                    }
                  >
                    + Add Step
                  </Button>
                </Box>
              )}
              renderItem={(idx) => {
                return (
                  <Stack align={"start"} direction={"row"} gap={4}>
                    <Badge
                      colorPalette={"brand"}
                      size={"lg"}
                      variant={"solid"}
                      fontWeight={"semibold"}
                    >
                      {idx + 1}
                    </Badge>
                    <Stack gap={4} flex={1}>
                      <AppInput<ExerciseFormValues>
                        name={`instructions.${idx}.title`}
                        label="Title"
                        placeholder={`Step title (e.g. "Setup")`}
                      />
                      <AppTextarea<ExerciseFormValues>
                        name={`instructions.${idx}.text`}
                        label="Instruction"
                        placeholder="Describe what to do in this step"
                      />
                    </Stack>
                  </Stack>
                );
              }}
            />
          </Card.Body>
        </Card.Root>

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
            Submit
          </Button>
        </Box>
      </Stack>
    </AppForm>
  );
}

export default ExerciseForm;
