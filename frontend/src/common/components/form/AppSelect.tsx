import { Field, NativeSelect } from '@chakra-ui/react';
import { useId } from 'react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';

type SelectOptions<T> = {
  label: string;
  value: T;
};

type AppSelect<T extends FieldValues, TValue extends string> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  options: SelectOptions<TValue>[];
};

function AppSelect<T extends FieldValues, TValue extends string>({
  name,
  label,
  required = true,
  placeholder,
  options,
}: AppSelect<T, TValue>) {
  const id = useId();
  const { register, getFieldState, formState } = useFormContext();

  const { error } = getFieldState(name, formState);

  return (
    <Field.Root invalid={!!error} required={required}>
      <Field.Label htmlFor={id}>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <NativeSelect.Root>
        <NativeSelect.Field
          placeholder={placeholder}
          id={id}
          {...register(name)}
        >
          {options.map((o) => {
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
}

export default AppSelect;
