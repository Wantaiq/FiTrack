import type { WorkoutTemplateFull } from '../schemas/workout-template.schema';

type Props = {
  workoutTemplate: WorkoutTemplateFull;
};

function WorkoutTemplateDetails({ workoutTemplate }: Props) {
  return <h1>{workoutTemplate.name}</h1>;
}

export default WorkoutTemplateDetails;
