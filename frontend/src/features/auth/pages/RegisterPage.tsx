import { useNavigate } from 'react-router';
import RegisterForm from '../components/RegisterForm';
import { useRegister } from '../hooks/useRegister';
import type { RegisterFormValues } from '../schemas/register.schema';

function RegisterPage() {
  const { mutateAsync, isPending, error } = useRegister();
  const navigate = useNavigate();

  async function handleSubmit(values: RegisterFormValues) {
    await mutateAsync(values);

    navigate('/');
  }

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      error={error}
    />
  );
}

export default RegisterPage;
