import { AppForm, AppInput } from '@/common/components/form';
import {
  registerSchema,
  type RegisterFormValues,
} from '../schemas/register.schema';
import { Button } from '@chakra-ui/react';

type Props = {
  onSubmit: (values: RegisterFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: Error | null;
};

function RegisterForm({ onSubmit, isSubmitting, error }: Props) {
  return (
    <AppForm onSubmit={onSubmit} schema={registerSchema}>
      <AppInput<RegisterFormValues>
        name="email"
        type="email"
        label="Email"
        placeholder="john.doe@email.com"
      />
      <AppInput<RegisterFormValues>
        name="password"
        type="password"
        label="Password"
        placeholder="*******"
      />
      <AppInput<RegisterFormValues>
        name="username"
        label="Username"
        placeholder="john.doe"
      />
      <Button type="submit" loading={isSubmitting}>
        Register
      </Button>
    </AppForm>
  );
}

export default RegisterForm;
