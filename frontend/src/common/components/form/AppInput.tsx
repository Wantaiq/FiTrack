import { Field, Input } from '@chakra-ui/react';
import { useId } from 'react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';

type AppInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
};

function AppInput<T extends FieldValues>({
  name,
  label,
  required = true,
  type = 'text',
  placeholder,
}: AppInputProps<T>) {
  const id = useId();
  const { register, getFieldState, formState } = useFormContext();

  const { error } = getFieldState(name, formState);

  return (
    <Field.Root invalid={!!error} required={required} gap="2">
      <Field.Label htmlFor={id}>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Input
        {...register(name)}
        id={id}
        type={type}
        placeholder={placeholder}
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

export default AppInput;
