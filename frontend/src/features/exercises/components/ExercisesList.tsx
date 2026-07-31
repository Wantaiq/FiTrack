import { RxChevronRight } from 'react-icons/rx';
import { Badge, Card, Grid, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import type { ExercisePartial } from '../schemas/exercise.schema';

type Props = {
  exercises: ExercisePartial[];
};

function ExercisesList({ exercises }: Props) {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap="4">
        {exercises.map((exercise) => (
          <Card.Root key={exercise.id} className="group" gap={2}>
            <Card.Header>
              <Stack
                direction="row"
                alignItems="center"
                justify={'space-between'}
                mb={1}
              >
                <Card.Title asChild fontSize={'xl'}>
                  <LinkOverlay asChild>
                    <Link to={exercise.id}>{exercise.name}</Link>
                  </LinkOverlay>
                </Card.Title>
                <Stack
                  direction="row"
                  alignItems="center"
                  pointerEvents={'none'}
                  color="cyan.500"
                  fontWeight="semibold"
                  fontSize="sm"
                  opacity="0"
                  transform="translateY(4px)"
                  transition="all 0.2s ease-in-out"
                  _groupHover={{
                    opacity: '1',
                  }}
                >
                  <Text>View</Text>
                  <RxChevronRight aria-hidden={true} />
                </Stack>
              </Stack>
              <Card.Description lineClamp={2}>
                {exercise.description}
              </Card.Description>
            </Card.Header>
            <Card.Footer mt="auto">
              <Badge colorPalette="cyan" size="md">
                {exercise.difficulty}
              </Badge>
              <Badge colorPalette="cyan" size="md">
                {exercise.type}
              </Badge>
              <Badge colorPalette="cyan" size="md">
                {exercise.mechanic}
              </Badge>
            </Card.Footer>
          </Card.Root>
        ))}
      </Grid>
    </>
  );
}

export default ExercisesList;
