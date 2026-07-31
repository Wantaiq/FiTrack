import { Link as RouterLink, useNavigate } from 'react-router';
import RegisterForm from '../components/RegisterForm';
import { useRegister } from '../hooks/useRegister';
import type { RegisterFormValues } from '../schemas/register.schema';
import { AbsoluteCenter, Card, Link, Text } from '@chakra-ui/react';

function RegisterPage() {
  const { mutateAsync, isPending, error } = useRegister();
  const navigate = useNavigate();

  async function handleSubmit(values: RegisterFormValues) {
    await mutateAsync(values);

    navigate('/');
  }

  return (
    <AbsoluteCenter as="main">
      <Card.Root>
        <Card.Header>
          <Card.Title as={'h1'} fontSize={'2xl'}>
            Register
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <RegisterForm
            onSubmit={handleSubmit}
            isSubmitting={isPending}
            error={error}
          />
        </Card.Body>
        <Card.Footer justifyContent={'center'}>
          <Text>
            Already have an account?
            <Link asChild ml={'1'} variant="underline">
              <RouterLink to="/login">Login</RouterLink>
            </Link>
          </Text>
        </Card.Footer>
      </Card.Root>
    </AbsoluteCenter>
  );
}

export default RegisterPage;
