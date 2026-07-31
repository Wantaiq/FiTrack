import { Box, IconButton, Stack, StackSeparator } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import {
  useFieldArray,
  useFormContext,
  type FieldValues,
  type UseFieldArrayAppend,
  type FieldArrayPath,
  type FieldArrayWithId,
} from 'react-hook-form';
import { RxTrash } from 'react-icons/rx';

type AppFieldArrayProps<
  TFieldValues extends FieldValues,
  TName extends FieldArrayPath<TFieldValues>,
> = {
  name: TName;
  renderAppendButton: (
    addItem: UseFieldArrayAppend<TFieldValues, TName>,
    length: number,
  ) => ReactNode;
  renderItem: (
    idx: number,
    field: FieldArrayWithId<TFieldValues, TName>,
  ) => ReactNode;
};

function AppFieldArray<
  TFieldValues extends FieldValues,
  TName extends FieldArrayPath<TFieldValues>,
>({
  name,
  renderAppendButton,
  renderItem,
}: AppFieldArrayProps<TFieldValues, TName>) {
  const { control } = useFormContext<TFieldValues>();

  const { fields, append, remove } = useFieldArray<TFieldValues, TName>({
    control,
    name,
  });

  return (
    <>
      <Stack gap={8} as={'ul'} separator={<StackSeparator />}>
        {fields.map((item, idx) => (
          <Stack key={item.id} as={'li'} gap={4} align={'start'}>
            <Box flex={1}>{renderItem(idx, item)}</Box>
            <IconButton
              disabled={fields.length === 1}
              colorPalette={'red'}
              variant={'ghost'}
              size={'lg'}
              onClick={() => remove(idx)}
              type="button"
              aria-label="Remove"
            >
              <RxTrash />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      {renderAppendButton(append, fields.length)}
    </>
  );
}

export default AppFieldArray;
