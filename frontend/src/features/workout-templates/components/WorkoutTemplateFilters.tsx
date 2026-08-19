import { IconButton, Input, InputGroup, Stack } from '@chakra-ui/react';
import { RxCross2, RxMagnifyingGlass } from 'react-icons/rx';
import { useState } from 'react';
import useWorkoutTemplatesFilters from '../hooks/useWorkoutTemplatesFilters';

export function WorkoutTemplateFilters() {
  const { filters, setName, clearFilters } = useWorkoutTemplatesFilters();

  const [searchInput, setSearchInput] = useState(filters.name);

  return (
    <Stack direction="row" alignItems="center">
      <InputGroup
        flex={3}
        endElement={
          searchInput && (
            <Stack direction={'row'} justifyContent={'start'} align={'center'}>
              <IconButton
                aria-label="Search"
                variant="subtle"
                onClick={() => {
                  setName(searchInput);
                }}
              >
                <RxMagnifyingGlass />
              </IconButton>
              <IconButton
                aria-label="Clear search"
                variant="subtle"
                onClick={() => {
                  setSearchInput('');
                  clearFilters();
                }}
              >
                <RxCross2 />
              </IconButton>
            </Stack>
          )
        }
      >
        <Input
          placeholder="Search templates..."
          value={searchInput}
          type="search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </InputGroup>
    </Stack>
  );
}
