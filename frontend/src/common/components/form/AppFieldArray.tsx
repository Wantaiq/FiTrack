import type { ReactNode } from 'react';
import {
  useFieldArray,
  useFormContext,
  type FieldValues,
  type UseFieldArrayAppend,
  type FieldArrayPath,
  type FieldArrayWithId,
} from 'react-hook-form';

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
      <ul>
        {fields.map((item, idx) => (
          <div key={item.id}>
            <li>{renderItem(idx, item)}</li>
            <button onClick={() => remove(idx)} type="button">
              Remove
            </button>
          </div>
        ))}
      </ul>
      {renderAppendButton(append, fields.length)}
    </>
  );
}

export default AppFieldArray;
