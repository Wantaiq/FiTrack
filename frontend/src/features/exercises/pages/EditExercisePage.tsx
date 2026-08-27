import { Link, Navigate, useNavigate, useParams } from "react-router";
import type { ExerciseFormValues } from "../schemas/create-exercise.schema";
import { Heading, IconButton, Loader, Stack } from "@chakra-ui/react";
import { RxChevronLeft } from "react-icons/rx";
import ExerciseForm from "../components/ExerciseForm";
import useExerciseDetails from "../hooks/useExerciseDetails";
import useUpdateExercise from "../hooks/useUpdateExercise";

function EditExercisePage() {
  const { id } = useParams();
  const { data: exercise, isPending, error } = useExerciseDetails(id!);
  const navigate = useNavigate();
  const {
    mutate,
    isPending: isUpdatePending,
    error: updateError,
  } = useUpdateExercise();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  async function handleSubmit(values: ExerciseFormValues) {
    mutate(
      { id: id!, dto: values },
      {
        onSuccess: () => {
          navigate(`/exercises/${id}`);
        },
      },
    );
  }

  return (
    <Stack gap={8}>
      <Stack direction="row" alignItems="center" gap={4}>
        <IconButton variant="subtle" size={"md"} aria-label="Go back" asChild>
          <Link to={`/exercises/${exercise.id}`}>
            <RxChevronLeft />
          </Link>
        </IconButton>
        <Heading as="h1" fontSize="2xl">
          Edit Exercise
        </Heading>
      </Stack>
      <ExerciseForm
        initialValues={exercise}
        onSubmit={handleSubmit}
        isSubmitting={isUpdatePending}
        error={updateError}
      />
    </Stack>
  );
}

export default EditExercisePage;
