import { AppForm, AppInput } from '@/common/components/form';
import {
  registerSchema,
  type RegisterFormValues,
} from '../schemas/register.schema';
import { Alert, Button, Flex } from '@chakra-ui/react';

type Props = {
  onSubmit: (values: RegisterFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: Error | null;
};

function RegisterForm({ onSubmit, isSubmitting, error }: Props) {
  return (
    <AppForm onSubmit={onSubmit} schema={registerSchema}>
      <Flex direction="column" gap="4">
        <AppInput<RegisterFormValues>
          name="email"
          type="email"
          label="Email"
          placeholder="john.doe@email.com"
        />
        <AppInput<RegisterFormValues>
          name="username"
          label="Username"
          placeholder="john.doe"
        />
        <AppInput<RegisterFormValues>
          name="password"
          type="password"
          label="Password"
          placeholder="*******"
        />
        <Button
          type="submit"
          size="lg"
          fontWeight="semibold"
          loading={isSubmitting}
        >
          Register
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

export default RegisterForm;
