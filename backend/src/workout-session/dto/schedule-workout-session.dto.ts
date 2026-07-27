import { IsDateString, IsUUID } from 'class-validator';

export class ScheduleWorkoutSessionDto {
  @IsUUID('4')
  templateId!: string;

  @IsDateString({ strict: true })
  scheduledAt!: string;
}
