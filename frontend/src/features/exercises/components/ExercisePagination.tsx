import {
  ButtonGroup,
  IconButton,
  Pagination,
  type PaginationPageChangeDetails,
} from '@chakra-ui/react';

type Props = {
  totalItems: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: PaginationPageChangeDetails) => void;
};
function ExercisesPagination({
  totalItems,
  limit,
  currentPage,
  onPageChange,
}: Props) {
  return (
    <Pagination.Root
      count={totalItems}
      pageSize={limit}
      page={currentPage}
      onPageChange={(e) => onPageChange(e)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <p>{'<'}</p>
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <p>{'>'}</p>
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}

export default ExercisesPagination;
