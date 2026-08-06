import {
  Badge,
  Card,
  Heading,
  IconButton,
  Stack,
  StackSeparator,
  Text,
} from '@chakra-ui/react';
import type { ExerciseFull } from '../schemas/exercise.schema';
import { Link } from 'react-router';
import { RxChevronLeft, RxPencil1, RxTrash } from 'react-icons/rx';

type Props = {
  exercise: ExerciseFull;
  onDelete: () => void;
};

function ExerciseDetails({ exercise, onDelete }: Props) {
  return (
    <Stack gap={8}>
      <Stack direction="row" alignItems="center" gap={4}>
        <IconButton size={'md'} aria-label="Go back" variant={'subtle'} asChild>
          <Link to="/exercises">
            <RxChevronLeft />
          </Link>
        </IconButton>
        <Stack
          direction="row"
          alignItems={'center'}
          flex={1}
          justifyContent={'space-between'}
        >
          <Stack alignItems={'start'}>
            <Heading as="h1" fontSize="2xl">
              {exercise.name}
            </Heading>
            <Stack direction="row" alignItems="center" gap={2}>
              <Badge colorPalette="cyan" size="sm">
                {exercise.difficulty}
              </Badge>
              <Badge colorPalette="cyan" size="sm">
                {exercise.type}
              </Badge>
              <Badge colorPalette="cyan" size="sm">
                {exercise.mechanic}
              </Badge>
            </Stack>
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
      </Stack>
      <Card.Root w="full">
        <Card.Header
          borderBottomWidth={1}
          paddingBlockEnd={4}
          borderColor={'gray.muted'}
        >
          <Card.Title fontSize={'xl'}>Description</Card.Title>
        </Card.Header>
        <Card.Body>{exercise.description}</Card.Body>
      </Card.Root>
      <Card.Root w="full">
        <Card.Header
          borderBottomWidth={1}
          paddingBlockEnd={4}
          borderColor={'gray.muted'}
        >
          <Card.Title as={'h2'} fontSize={'xl'}>
            Instructions
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack as={'ul'} gap={4} separator={<StackSeparator />}>
            {exercise.instructions.map((instruction, idx) => (
              <Stack
                direction="row"
                key={instruction.id}
                as={'li'}
                alignItems={'start'}
                gap={4}
              >
                <Badge
                  colorPalette={'brand'}
                  size={'lg'}
                  variant={'solid'}
                  fontWeight={'semibold'}
                >
                  {idx + 1}
                </Badge>
                <Stack gap={0}>
                  <Heading as={'h3'} fontSize={'lg'}>
                    {instruction.title}
                  </Heading>
                  <Text>{instruction.text}</Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}

export default ExerciseDetails;
