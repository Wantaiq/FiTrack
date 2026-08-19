import { Loader } from '@/common/components';
import useWorkoutTemplates from '../hooks/useWorkoutTemplates';
import useWorkoutTemplatesFilters from '../hooks/useWorkoutTemplatesFilters';
import AppPagination from '@/common/components/AppPagination';
import { Button, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router';
import { RxPlus } from 'react-icons/rx';
import { WorkoutTemplateFilters } from '../components/WorkoutTemplateFilters';
import WorkoutTemplatesList from '../components/WorkoutTemplatesList';

function WorkoutTemplatesPage() {
  const { filters, setPage } = useWorkoutTemplatesFilters();

  const { data, isPending, error } = useWorkoutTemplates({
    page: filters.page,
    name: filters.name,
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <Stack gap={8}>
      <Stack
        direction={'row'}
        gap={4}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading as={'h1'} fontSize={'2xl'}>
          Workout Templates Library
        </Heading>
        <Button asChild fontWeight={'semibold'} colorPalette={'brand'}>
          <Link to="new">
            <RxPlus aria-hidden="true" /> New Template
          </Link>
        </Button>
      </Stack>
      <WorkoutTemplateFilters />
      <WorkoutTemplatesList workoutTemplates={data.items} />
      {data.items.length ? (
        <AppPagination
          onPageChange={(e) => setPage(e.page)}
          totalItems={data.meta.totalItems}
          limit={data.meta.limit}
          currentPage={data.meta.page}
        />
      ) : null}
    </Stack>
  );
}

export default WorkoutTemplatesPage;
