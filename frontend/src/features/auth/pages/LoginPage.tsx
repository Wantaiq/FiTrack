import { useNavigate } from 'react-router';
import LoginForm from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';
import type { LoginFormValues } from '../schemas/login.schema';

function LoginPage() {
  const { mutateAsync, isPending, error } = useLogin();
  const navigate = useNavigate();

  async function handleSubmit(values: LoginFormValues) {
    await mutateAsync(values);

    navigate('/');
  }

  return (
    <LoginForm onSubmit={handleSubmit} isSubmitting={isPending} error={error} />
  );
}

export default LoginPage;
