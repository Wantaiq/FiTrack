import { Loader } from '@/common/components';
import useExerciseFilters from '../hooks/useExerciseFilters';
import useExercises from '../hooks/useExercises';
import { ExerciseFilters } from '../components/ExerciseFilters';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router';
import ExercisesPagination from '../components/ExercisePagination';

function ExercisesPage() {
  const { filters, updateFilters } = useExerciseFilters();

  const { data, isPending, error } = useExercises(filters);

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
      {data.items.map((exercise: any) => (
        <div>
          {exercise.name} <Link to={`${exercise.id}`}> Details</Link>
        </div>
      ))}
      <ExercisesPagination
        onPageChange={(e) => updateFilters({ page: e.page })}
        totalItems={data.meta.totalItems}
        limit={data.meta.limit}
        currentPage={filters.page}
      />
    </>
  );
}

export default ExercisesPage;
