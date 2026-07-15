import type { ReactNode } from 'react';
import {
  useFieldArray,
  useFormContext,
  type Path,
  type FieldValues,
  type FieldArray,
} from 'react-hook-form';

type AppFieldArrayProps<T extends FieldValues> = {
  name: Path<T>;
  appendValues: (length: number) => FieldArray<FieldValues, Path<T>>;
  renderItem: (idx: number) => ReactNode;
};

function AppFieldArray<T extends FieldValues>({
  name,
  appendValues,
  renderItem,
}: AppFieldArrayProps<T>) {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      <ul>
        {fields.map((item, idx) => (
          <div key={item.id}>
            <li>{renderItem(idx)}</li>
            <button onClick={() => remove(idx)}>Remove</button>
          </div>
        ))}
      </ul>
      <button onClick={() => append(appendValues(fields.length))}>Add</button>
    </>
  );
}

export default AppFieldArray;
