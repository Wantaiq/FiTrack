import client from "@/common/api/client";
import type { WorkoutTemplateFormValues } from "../schemas/create-workout-template.schema";
import type { WorkoutTemplateFull } from "../schemas/workout-template.schema";

async function updateWorkoutTemplate(updateData: {
  id: string;
  dto: WorkoutTemplateFormValues;
}): Promise<WorkoutTemplateFull> {
  const { data } = await client.put(
    `/workout-templates/${updateData.id}`,
    updateData.dto,
  );

  return data;
}

export default updateWorkoutTemplate;
