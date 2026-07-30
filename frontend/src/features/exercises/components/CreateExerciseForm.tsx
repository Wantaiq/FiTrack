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
import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Stack,
} from '@chakra-ui/react';
import {
  createExerciseSchema,
  type CreateExerciseFormValues,
} from '../schemas/create-exercise.schema';
import { Link } from 'react-router';

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
      <Stack gap={'8'}>
        <Card.Root w="full">
          <Card.Body>
            <Flex direction="column" gap="6">
              <AppInput<CreateExerciseFormValues>
                name="name"
                type="text"
                label="Exercise name"
                placeholder="e.g. Bench Press"
              />
              <AppTextarea<CreateExerciseFormValues>
                name="description"
                label="Description"
                placeholder="Brief overview of exercise"
              />
            </Flex>
          </Card.Body>
        </Card.Root>

        <Card.Root w="full">
          <Card.Header>
            <Card.Title as={'h2'}>Classification</Card.Title>
          </Card.Header>
          <Card.Body>
            <Flex gap="4">
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
            </Flex>
          </Card.Body>
        </Card.Root>

        <Card.Root w="full">
          <Card.Header borderBottom={'white'}>
            <Card.Title as={'h2'}>Instructions</Card.Title>
            <Card.Description>Provide steps for exercise</Card.Description>
          </Card.Header>
          <Card.Body>
            <AppFieldArray<CreateExerciseFormValues, 'instructions'>
              name="instructions"
              renderAppendButton={(addItem, length) => (
                <Box borderTopWidth={'1px'} mt={8} py={8}>
                  <Button
                    w={'full'}
                    fontWeight={'semibold'}
                    type="button"
                    variant={'outline'}
                    onClick={() =>
                      addItem({ order: length + 1, title: '', text: '' })
                    }
                  >
                    + Add Step
                  </Button>
                </Box>
              )}
              renderItem={(idx) => {
                return (
                  <Flex align={'start'} gap={4}>
                    <Badge
                      colorPalette={'brand'}
                      size={'lg'}
                      variant={'solid'}
                      fontWeight={'semibold'}
                    >
                      {idx + 1}
                    </Badge>
                    <Stack gap={4} flex={1}>
                      <AppInput<CreateExerciseFormValues>
                        name={`instructions.${idx}.title`}
                        label="Title"
                        placeholder={`Step title (e.g. "Setup")`}
                      />
                      <AppTextarea<CreateExerciseFormValues>
                        name={`instructions.${idx}.text`}
                        label="Instruction"
                        placeholder="Describe what to do in this step"
                      />
                    </Stack>
                  </Flex>
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
        <HStack gap={4}>
          <Button
            type="submit"
            size={'lg'}
            fontWeight={'semibold'}
            loading={isSubmitting}
            colorPalette={'brand'}
          >
            Create exercise
          </Button>
          <Button
            type="button"
            asChild
            size={'lg'}
            variant="outline"
            colorPalette={'brand'}
          >
            <Link to={'/exercises'}>Cancel</Link>
          </Button>
        </HStack>
      </Stack>
    </AppForm>
  );
}

export default CreateExerciseForm;
