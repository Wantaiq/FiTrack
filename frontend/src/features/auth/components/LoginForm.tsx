import { AppForm, AppInput } from '@/common/components/form';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { Button } from '@chakra-ui/react';

type Props = {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: Error | null;
};

function LoginForm({ onSubmit, isSubmitting, error }: Props) {
  return (
    <AppForm onSubmit={onSubmit} schema={loginSchema}>
      <AppInput<LoginFormValues>
        name="email"
        type="email"
        label="Email"
        placeholder="john.doe@email.com"
      />
      <AppInput<LoginFormValues>
        name="password"
        type="password"
        label="Password"
      />
      <Button type="submit" loading={isSubmitting}>
        Login
      </Button>
    </AppForm>
  );
}

export default LoginForm;
