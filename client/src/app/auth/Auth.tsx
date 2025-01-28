'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { ButtonActive } from '@/components/ui/button/ButtonActive';
import { ButtonInactive } from '@/components/ui/button/ButtonInactive';

import { TAuthInput } from '@/types/auth.types';

export const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthInput>();

  const onSubmit: SubmitHandler<TAuthInput> = data => {};

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}></form>
      <br></br>
      <ButtonActive>Active</ButtonActive>
      <ButtonInactive>Inactive</ButtonInactive>
    </section>
  );
};
