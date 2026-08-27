import { Badge, Card, Grid, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import type { WorkoutTemplatePartial } from "../schemas/workout-template.schema";
import { Link } from "react-router";
import { RxChevronRight } from "react-icons/rx";

type Props = {
  workoutTemplates: WorkoutTemplatePartial[];
};

function WorkoutTemplatesList({ workoutTemplates }: Props) {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      {workoutTemplates.map((template) => (
        <Card.Root key={template.id} className="group" gap={2} w={"full"}>
          <Card.Header>
            <Stack
              direction="row"
              alignItems="center"
              justify={"space-between"}
              mb={1}
            >
              <Card.Title asChild fontSize={"xl"}>
                <LinkOverlay asChild>
                  <Link to={template.id}>{template.name}</Link>
                </LinkOverlay>
              </Card.Title>
              <Stack
                direction="row"
                alignItems="center"
                pointerEvents={"none"}
                color="cyan.500"
                fontWeight="semibold"
                fontSize="sm"
                opacity="0"
                transform="translateY(4px)"
                transition="all 0.2s ease-in-out"
                _groupHover={{
                  opacity: "1",
                }}
              >
                <Text>View</Text>
                <RxChevronRight aria-hidden={true} />
              </Stack>
            </Stack>
          </Card.Header>
          <Card.Footer mt={"auto"} flexWrap={"wrap"}>
            {template.exercises.map(({ exercise }) => {
              return (
                <Badge colorPalette="cyan" size="md" key={exercise.id}>
                  {exercise.name}
                </Badge>
              );
            })}
          </Card.Footer>
        </Card.Root>
      ))}
    </Grid>
  );
}

export default WorkoutTemplatesList;
