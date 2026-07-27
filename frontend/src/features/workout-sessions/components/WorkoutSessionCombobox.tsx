import useDebounce from '@/common/hooks/useDebounce';
import useWorkoutTemplates from '@/features/workout-templates/hooks/useWorkoutTemplates';
import {
  Combobox,
  createListCollection,
  Field,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function WorkoutSessionCombobox() {
  const { control, getFieldState, formState } = useFormContext();
  const { error } = getFieldState('templateId', formState);

  const [nameSearch, setNameSearch] = useState('');
  const debouncedSearch = useDebounce(nameSearch, 300);
  const {
    data,
    isFetching,
    error: fetchingError,
  } = useWorkoutTemplates({
    name: debouncedSearch,
  });

  const collection = useMemo(() => {
    return createListCollection({
      items: data?.items || [],
      itemToString: (item) => item.name,
      itemToValue: (item) => item.id,
    });
  }, [data]);

  return (
    <Stack gap="4" align="flex-start">
      <Field.Root invalid={!!error} width="320px">
        <Field.Label>Template</Field.Label>
        <Controller
          control={control}
          name="templateId"
          render={({ field }) => (
            <Combobox.Root
              onInputValueChange={(e) => setNameSearch(e.inputValue)}
              collection={collection}
              value={field.value ? [field.value] : []}
              onValueChange={({ value }) => field.onChange(value[0] || '')}
              onInteractOutside={() => field.onBlur()}
            >
              <Combobox.Control>
                <Combobox.Input placeholder="Type to search" />
                <Combobox.IndicatorGroup>
                  <Combobox.ClearTrigger />
                  <Combobox.Trigger />
                </Combobox.IndicatorGroup>
              </Combobox.Control>

              <Portal>
                <Combobox.Positioner>
                  <Combobox.Content>
                    <Combobox.Empty>No templates found</Combobox.Empty>
                    {!isFetching &&
                      !fetchingError &&
                      collection.items.map((item) => (
                        <Combobox.Item key={item.id} item={item}>
                          {item.name}
                          <Combobox.ItemIndicator />
                        </Combobox.Item>
                      ))}
                    {!isFetching && fetchingError && (
                      <p>Something went wrong</p>
                    )}
                  </Combobox.Content>
                </Combobox.Positioner>
              </Portal>
            </Combobox.Root>
          )}
        />
        <Field.ErrorText>{error?.message}</Field.ErrorText>
      </Field.Root>
    </Stack>
  );
}

export default WorkoutSessionCombobox;
