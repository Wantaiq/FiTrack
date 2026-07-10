import { WorkoutStatus } from '../enums/workout.enum';

export interface WorkoutFilters {
  name?: string;
  page: number;
  limit: number;
}
