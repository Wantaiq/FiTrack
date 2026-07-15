import { Field, Textarea } from '@chakra-ui/react';
import { useId } from 'react';
import { useFormContext, type FieldValues, type Path } from 'react-hook-form';

type AppTextareaProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
};

function AppTextarea<T extends FieldValues>({
  name,
  label,
  required = true,
  placeholder,
}: AppTextareaProps<T>) {
  const id = useId();
  const { register, getFieldState, formState } = useFormContext();

  const { error } = getFieldState(name, formState);

  return (
    <Field.Root invalid={!!error} required={required}>
      <Field.Label htmlFor={id}>
        {label}
        <Field.RequiredIndicator />
      </Field.Label>
      <Textarea {...register(name)} id={id} placeholder={placeholder} />
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  );
}

export default AppTextarea;
