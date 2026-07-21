import { Loader } from '@/common/components';
import useWorkoutTemplates from '../hooks/useWorkoutTemplates';
import useWorkoutTemplatesFilters from '../hooks/useWorkoutTemplatesFilters';
import useDebounce from '@/common/hooks/useDebounce';
import AppPagination from '@/common/components/AppPagination';
import { Button, Input } from '@chakra-ui/react';
import { Link } from 'react-router';

function WorkoutTemplatesPage() {
  const { filters, setPage, setName } = useWorkoutTemplatesFilters();
  const debouncedNameSearch = useDebounce(filters.name, 300);

  const { data, isPending, error } = useWorkoutTemplates({
    page: filters.page,
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
      <Input
        placeholder="bench press"
        value={filters.name}
        onChange={(e) => setName(e.target.value)}
      />
      {data.items.map((template) => {
        return (
          <div>
            {template.name}
            <Link to={`${template.id}`}>Details</Link>
          </div>
        );
      })}
      <AppPagination
        onPageChange={(e) => setPage(e.page)}
        totalItems={data.meta.totalItems}
        limit={data.meta.limit}
        currentPage={data.meta.page}
      />
    </>
  );
}

export default WorkoutTemplatesPage;
