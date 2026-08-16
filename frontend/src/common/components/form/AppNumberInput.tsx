import { Field, NumberInput } from '@chakra-ui/react';
import { useId } from 'react';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type AppNumberInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
};

function AppNumberInput<T extends FieldValues>({
  name,
  label,
  required = true,
}: AppNumberInputProps<T>) {
  const id = useId();
  const { getFieldState, formState, control } = useFormContext();

  const { error } = getFieldState(name, formState);

  return (
    <Field.Root invalid={!!error} required={required} gap="2">
      <Field.Label htmlFor={id}>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <NumberInput.Root
            w="full"
            disabled={field.disabled}
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value);
            }}
          >
            <NumberInput.Control />
            <NumberInput.Input onBlur={field.onBlur} />
          </NumberInput.Root>
        )}
      />
      <Field.ErrorText
        fontWeight="semibold"
        as="div"
        bg="bg.error"
        p="2"
        w="full"
      >
        {error?.message}
      </Field.ErrorText>
    </Field.Root>
  );
}

export default AppNumberInput;
