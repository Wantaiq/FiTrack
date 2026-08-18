import { Loader } from '@/common/components';
import useExerciseFilters from '../hooks/useExerciseFilters';
import useExercises from '../hooks/useExercises';
import ExercisesList from '../components/ExercisesList';
import AppPagination from '@/common/components/AppPagination';
import { Button, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router';
import { RxPlus } from 'react-icons/rx';
import { ExerciseFilters } from '../components/ExerciseFilters';

function ExercisesPage() {
  const { filters, setPage } = useExerciseFilters();

  const { data, isPending, error } = useExercises({
    ...filters,
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
          Exercises Library
        </Heading>
        <Button asChild fontWeight={'semibold'} colorPalette={'brand'}>
          <Link to="new">
            <RxPlus aria-hidden="true" /> New Exercise
          </Link>
        </Button>
      </Stack>
      <ExerciseFilters />
      <ExercisesList exercises={data.items} />
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

export default ExercisesPage;
