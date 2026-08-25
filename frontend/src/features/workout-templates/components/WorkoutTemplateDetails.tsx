import {
  Badge,
  Card,
  Heading,
  IconButton,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import type { WorkoutTemplateFull } from "../schemas/workout-template.schema";
import { Link } from "react-router";
import {
  RxChevronLeft,
  RxChevronRight,
  RxPencil1,
  RxTrash,
} from "react-icons/rx";

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
      <Stack direction={"row"} alignItems={"center"} gap={4}>
        <IconButton size={"md"} aria-label="Go back" variant={"subtle"} asChild>
          <Link to="/workout-templates">
            <RxChevronLeft />
          </Link>
        </IconButton>
        <Stack
          direction={"row"}
          alignItems={"center"}
          flex={1}
          justifyContent={"space-between"}
        >
          <Heading as="h1" fontSize="2xl">
            {workoutTemplate.name}
          </Heading>
        </Stack>
        <Stack direction={"row"} gap={4} alignItems={"center"}>
          <IconButton asChild aria-label="Edit exercise" variant={"outline"}>
            <Link to={"edit"}>
              <RxPencil1 />
            </Link>
          </IconButton>
          <IconButton
            onClick={onDelete}
            colorPalette={"red"}
            variant={"ghost"}
            size={"lg"}
            type="button"
            aria-label="Delete exercise"
          >
            <RxTrash />
          </IconButton>
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={8}>
        <Card.Root size={"sm"} w={"3xs"}>
          <Card.Header color={"fg.muted"}>
            <Card.Title fontWeight={"normal"} fontSize={"lg"}>
              Exercises
            </Card.Title>
          </Card.Header>
          <Card.Body fontWeight={"semibold"} fontSize={"2xl"} py={2}>
            {workoutTemplate.exercises.length}
          </Card.Body>
        </Card.Root>

        <Card.Root size={"sm"} w={"3xs"}>
          <Card.Header color={"fg.muted"}>
            <Card.Title fontWeight={"normal"} fontSize={"lg"}>
              Sets
            </Card.Title>
          </Card.Header>
          <Card.Body fontWeight={"semibold"} fontSize={"2xl"} py={2}>
            {totalSets}
          </Card.Body>
        </Card.Root>
      </Stack>
      {workoutTemplate.exercises.map((templateExercise, idx) => (
        <Card.Root key={templateExercise.id} w={"2xl"}>
          <Card.Header>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justify={"space-between"}
            >
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <Badge
                  colorPalette={"brand"}
                  variant={"solid"}
                  fontWeight={"semibold"}
                >
                  {idx + 1}
                </Badge>
                <Text fontWeight={"semibold"} fontSize={"lg"}>
                  {templateExercise.exercise.name}
                </Text>
              </Stack>
              <Link to={`/exercises/${templateExercise.exercise.id}`}>
                <Stack
                  color={"cyan.500"}
                  fontWeight={"semibold"}
                  fontSize={"sm"}
                  as={"span"}
                  direction={"row"}
                  alignItems={"center"}
                >
                  <Text as={"span"}>Details</Text>
                  <RxChevronRight aria-hidden={true} display={"inline"} />
                </Stack>
              </Link>
            </Stack>
            <Card.Description>{templateExercise.note}</Card.Description>
          </Card.Header>
          <Card.Body>
            <Table.Root size={"sm"} w={"xl"}>
              <Table.Header>
                <Table.Row bg={"bg.subtle"}>
                  <Table.ColumnHeader color={"fg.muted"} fontSize={"sm"}>
                    #
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color={"fg.muted"} textAlign={"center"}>
                    Reps
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color={"fg.muted"} textAlign={"center"}>
                    Weight
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color={"fg.muted"} textAlign={"center"}>
                    RIR
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color={"fg.muted"} textAlign={"center"}>
                    RM%
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color={"fg.muted"} textAlign={"center"}>
                    Rest
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {templateExercise.sets.map((set) => (
                  <Table.Row key={set.id} bg={"bg.subtle"}>
                    <Table.Cell color={"fg.muted"} fontSize={"sm"}>
                      {set.order || "-"}
                    </Table.Cell>
                    <Table.Cell
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      fontSize={"md"}
                    >
                      {set.reps || "-"}
                    </Table.Cell>
                    <Table.Cell
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      fontSize={"md"}
                    >
                      {set.weight || "-"}
                    </Table.Cell>
                    <Table.Cell
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      fontSize={"md"}
                    >
                      {set.rir || "-"}
                    </Table.Cell>
                    <Table.Cell
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      fontSize={"md"}
                    >
                      {set.rm || "-"}
                    </Table.Cell>
                    <Table.Cell
                      textAlign={"center"}
                      fontWeight={"semibold"}
                      fontSize={"md"}
                    >
                      {set.rest || "-"}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
}

export default WorkoutTemplateDetails;
