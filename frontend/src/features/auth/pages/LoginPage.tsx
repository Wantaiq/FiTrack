import { Link as RouterLink, useNavigate } from 'react-router';
import LoginForm from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';
import type { LoginFormValues } from '../schemas/login.schema';
import { AbsoluteCenter, Card, Link, Text } from '@chakra-ui/react';

function LoginPage() {
  const { mutateAsync, isPending, error } = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(values: LoginFormValues) {
    await mutateAsync(values);

    navigate('/');
  }

  return (
    <AbsoluteCenter as="main">
      <Card.Root>
        <Card.Header>
          <Card.Title as={'h1'} fontSize={'2xl'}>
            Login
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <LoginForm
            onSubmit={handleSubmit}
            isSubmitting={isPending}
            error={error}
          />
        </Card.Body>
        <Card.Footer justifyContent={'center'}>
          <Text>
            Don't have an account?
            <Link asChild ml={'1'} variant="underline">
              <RouterLink to="/register">Register</RouterLink>
            </Link>
          </Text>
        </Card.Footer>
      </Card.Root>
    </AbsoluteCenter>
  );
}

export default LoginPage;
