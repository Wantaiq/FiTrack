import { AppForm, AppInput } from '@/common/components/form';
import { loginSchema, type LoginFormValues } from '../schemas/login.schema';
import { Alert, Button, Flex } from '@chakra-ui/react';
import type ApiError from '@/common/api/ApiError';

type Props = {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: ApiError | null;
};

function LoginForm({ onSubmit, isSubmitting, error }: Props) {
  return (
    <AppForm onSubmit={onSubmit} schema={loginSchema}>
      <Flex direction="column" gap="4">
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
          placeholder="*******"
        />
        <Button
          type="submit"
          loading={isSubmitting}
          size="lg"
          fontWeight="semibold"
        >
          Login
        </Button>
        {error && (
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{error.message}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        )}
      </Flex>
    </AppForm>
  );
}

export default LoginForm;
