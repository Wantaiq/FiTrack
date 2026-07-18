import { Loader } from '@/common/components';
import useExerciseFilters from '../hooks/useExerciseFilters';
import useExercises from '../hooks/useExercises';
import { ExerciseFilters } from '../components/ExerciseFilters';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router';
import ExercisesPagination from '../components/ExercisePagination';
import useDebounce from '@/common/hooks/useDebounce';

function ExercisesPage() {
  const { filters, setPage } = useExerciseFilters();

  const debouncedNameSearch = useDebounce(filters.name, 300);

  const { data, isPending, error } = useExercises({
    ...filters,
    name: debouncedNameSearch,
  });

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <Button asChild>
        <Link to="new">Create new</Link>
      </Button>
      <ExerciseFilters />
      {data.items.map((exercise) => (
        <div key={exercise.id}>
          {exercise.name} <Link to={`${exercise.id}`}> Details</Link>
        </div>
      ))}
      <ExercisesPagination
        onPageChange={(e) => setPage(e.page)}
        totalItems={data.meta.totalItems}
        limit={data.meta.limit}
        currentPage={data.meta.page}
      />
    </>
  );
}

export default ExercisesPage;
