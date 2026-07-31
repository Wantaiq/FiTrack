import {
  ButtonGroup,
  IconButton,
  Pagination,
  type PaginationPageChangeDetails,
} from '@chakra-ui/react';
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';

type Props = {
  totalItems: number;
  limit: number;
  currentPage: number;
  onPageChange: (page: PaginationPageChangeDetails) => void;
};
function AppPagination({
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
      <ButtonGroup variant={'subtle'} size={'md'}>
        <Pagination.PrevTrigger asChild>
          <IconButton aria-label="Go to previous page">
            <RxChevronLeft />
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
          <IconButton aria-label="Go to next page">
            <RxChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}

export default AppPagination;
