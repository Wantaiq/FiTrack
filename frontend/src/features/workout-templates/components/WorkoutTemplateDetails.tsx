import { Card, Heading, IconButton, Stack } from '@chakra-ui/react';
import type { WorkoutTemplateFull } from '../schemas/workout-template.schema';
import { Link } from 'react-router';
import { RxChevronLeft, RxPencil1, RxTrash } from 'react-icons/rx';

type Props = {
  workoutTemplate: WorkoutTemplateFull;
  onDelete: () => void;
};

function WorkoutTemplateDetails({ workoutTemplate, onDelete }: Props) {
  const totalSets = workoutTemplate.exercises.reduce(
    (accumulator, exercise) => accumulator + (exercise.sets?.length || 0),
    0,
  );

  return (
    <Stack gap={8}>
      <Stack direction="row" alignItems="center" gap={4}>
        <IconButton size={'md'} aria-label="Go back" variant={'subtle'} asChild>
          <Link to="/workout-templates">
            <RxChevronLeft />
          </Link>
        </IconButton>
        <Stack
          direction="row"
          alignItems={'center'}
          flex={1}
          justifyContent={'space-between'}
        >
          <Heading as="h1" fontSize="2xl">
            {workoutTemplate.name}
          </Heading>
        </Stack>
        <Stack direction={'row'} gap={4} alignItems={'center'}>
          <IconButton asChild aria-label="Edit exercise" variant={'outline'}>
            <Link to={'edit'}>
              <RxPencil1 />
            </Link>
          </IconButton>
          <IconButton
            onClick={onDelete}
            colorPalette={'red'}
            variant={'ghost'}
            size={'lg'}
            type="button"
            aria-label="Delete exercise"
          >
            <RxTrash />
          </IconButton>
        </Stack>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} gap={8}>
        <Card.Root size={'sm'} w={'3xs'}>
          <Card.Header color={'fg.muted'}>
            <Card.Title fontWeight={'normal'} fontSize={'lg'}>
              Exercises
            </Card.Title>
          </Card.Header>
          <Card.Body fontWeight={'semibold'} fontSize={'2xl'} py={2}>
            {workoutTemplate.exercises.length}
          </Card.Body>
        </Card.Root>

        <Card.Root size={'sm'} w={'3xs'}>
          <Card.Header color={'fg.muted'}>
            <Card.Title fontWeight={'normal'} fontSize={'lg'}>
              Sets
            </Card.Title>
          </Card.Header>
          <Card.Body fontWeight={'semibold'} fontSize={'2xl'} py={2}>
            {totalSets}
          </Card.Body>
        </Card.Root>
      </Stack>
    </Stack>
  );
}

export default WorkoutTemplateDetails;
