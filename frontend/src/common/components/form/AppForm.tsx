import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import type { ReactNode } from 'react';
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type SubmitHandler,
} from 'react-hook-form';
import type { z } from 'zod';

type AppFormProps<T extends z.ZodObject<any>> = {
  schema: T;
  defaultValues?: DefaultValues<z.input<T>>;
  onSubmit: SubmitHandler<z.output<T>>;
  children: ReactNode;
};

function AppForm<T extends z.ZodObject<any>>({
  schema,
  defaultValues,
  onSubmit,
  children,
}: AppFormProps<T>) {
  const form = useForm<z.input<T>, unknown, z.output<T>>({
    resolver: standardSchemaResolver(schema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default AppForm;
