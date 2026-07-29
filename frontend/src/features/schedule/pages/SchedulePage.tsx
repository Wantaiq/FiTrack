import { Loader } from '@/common/components';
import { AppForm } from '@/common/components/form';
import {
  useWorkoutSessions,
  WorkoutSessionDatePicker,
} from '@/features/workout-sessions';
import WorkoutSessionCombobox from '@/features/workout-sessions/components/WorkoutSessionCombobox';
import useCreateWorkoutSession from '@/features/workout-sessions/hooks/useCreateWorkoutSession';
import {
  createWorkoutSessionSchema,
  type CreateWorkoutSessionFormValues,
} from '@/features/workout-sessions/schemas/create-workout-session.schema';
import { type DateValue, parseDate, Button } from '@chakra-ui/react';
import { useState } from 'react';

function SchedulePage() {
  const [selectedDates, setSelectedDates] = useState<DateValue[]>([
    parseDate(new Date()),
  ]);

  const year = selectedDates[0].year;
  const month = selectedDates[0].month;
  const formattedToday = new Date(
    selectedDates[0].toString(),
  ).toLocaleDateString('at-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const {
    data: sessions,
    isPending,
    error,
  } = useWorkoutSessions({ year, month });
  const { mutate } = useCreateWorkoutSession();

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  function onSubmit(values: CreateWorkoutSessionFormValues) {
    mutate(values);
  }

  return (
    <>
      <AppForm schema={createWorkoutSessionSchema} onSubmit={onSubmit}>
        <WorkoutSessionCombobox />
        <WorkoutSessionDatePicker
          onSelect={(val) => setSelectedDates(val)}
          sessions={sessions}
        />
        <Button type="submit">Submit</Button>
      </AppForm>
    </>
  );
}

export default SchedulePage;
