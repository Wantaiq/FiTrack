import { Box, HStack, IconButton, Stack } from '@chakra-ui/react';
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
      <Stack gap={8} as={'ul'}>
        {fields.map((item, idx) => (
          <HStack
            key={item.id}
            as={'li'}
            gap={4}
            align={'start'}
            _notLast={{
              borderBottomWidth: '1px',
              paddingBottom: 8,
              borderColor: 'gray.muted',
            }}
          >
            <Box flex={1}>{renderItem(idx, item)}</Box>
            <IconButton
              colorPalette={'red'}
              variant={'ghost'}
              onClick={() => remove(idx)}
              type="button"
              aria-label="Remove"
            >
              <RxTrash />
            </IconButton>
          </HStack>
        ))}
      </Stack>
      {renderAppendButton(append, fields.length)}
    </>
  );
}

export default AppFieldArray;
