import { AppForm, AppInput } from "@/common/components/form";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register.schema";
import { Alert, Button, Stack, StackSeparator } from "@chakra-ui/react";

type Props = {
  onSubmit: (values: RegisterFormValues) => Promise<void> | void;
  isSubmitting: boolean;
  error: Error | null;
};

function RegisterForm({ onSubmit, isSubmitting, error }: Props) {
  return (
    <AppForm onSubmit={onSubmit} schema={registerSchema}>
      <Stack gap={8} separator={<StackSeparator />}>
        <Stack gap={4}>
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
        </Stack>
        <Button
          type="submit"
          size={"lg"}
          fontWeight={"semibold"}
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
      </Stack>
    </AppForm>
  );
}

export default RegisterForm;
