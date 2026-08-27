import client from "@/common/api/client";
import type { WorkoutTemplateFormValues } from "../schemas/create-workout-template.schema";

async function updateWorkoutTemplate(updateData: {
  id: string;
  dto: WorkoutTemplateFormValues;
}) {
  await client.put(`/workout-templates/${updateData.id}`, updateData.dto);
}

export default updateWorkoutTemplate;
