import { Heading, IconButton, Loader, Stack } from "@chakra-ui/react";
import { RxChevronLeft } from "react-icons/rx";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import WorkoutTemplateForm from "../components/WorkoutTemplateForm";
import useWorkoutTemplateDetails from "../hooks/useWorkoutTemplateDetails";
import type { WorkoutTemplateFormValues } from "../schemas/create-workout-template.schema";
import useUpdateWorkoutTemplate from "../hooks/useUpdateWorkoutTemplate";

function EditWorkoutTemplatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: workoutTemplate,
    isPending,
    error,
  } = useWorkoutTemplateDetails(id!);
  const {
    mutate,
    isPending: isUpdatePending,
    error: updateError,
  } = useUpdateWorkoutTemplate();

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  async function handleSubmit(values: WorkoutTemplateFormValues) {
    mutate(
      { id: id!, dto: values },
      {
        onSuccess: (workoutTemplate) => {
          navigate(`/workout-templates/${workoutTemplate.id}`);
        },
      },
    );
  }

  const defaultFormValues = workoutTemplate.exercises.map(
    (templateExercise) => {
      console.log(templateExercise);
      return {
        note: templateExercise.note,
        sets: templateExercise.sets,
        exerciseId: templateExercise.exercise.id,
        name: templateExercise.exercise.name,
      };
    },
  );

  return (
    <Stack gap={8}>
      <Stack direction="row" alignItems="center" gap={4}>
        <IconButton variant="subtle" size={"md"} aria-label="Go back" asChild>
          <Link to="/workout-templates">
            <RxChevronLeft />
          </Link>
        </IconButton>
        <Heading as="h1" fontSize="2xl">
          Edit Workout Template
        </Heading>
      </Stack>
      <WorkoutTemplateForm
        initialValues={{ ...workoutTemplate, exercises: defaultFormValues }}
        isSubmitting={isUpdatePending}
        error={updateError}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
}

export default EditWorkoutTemplatePage;
