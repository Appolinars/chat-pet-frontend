import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { AvatarUpload } from '@/components/common/avatarUpload/AvatarUpload';

import { emailRegex } from '@/shared/utils';

interface IFormInputs {
  username: string;
  email: string;
}

export const Settings: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'onBlur' });

  const onSubmit = (data: any) => console.log(data);
  return (
    <section className="container pt-11 flex flex-col justify-center items-center">
      <h1 className="text-xl lg:text-4xl text-center font-bold uppercase tracking-widest mb-5">Edit your details</h1>
      <form className="max-w-lg w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <AvatarUpload className="self-center" />
        <TextField
          label="Username"
          variant="outlined"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Min length must be at least 3 characters',
            },
          })}
          error={!!errors?.username?.message}
          helperText={`${errors?.username?.message || ''}`}
        />
        <TextField
          label="Email"
          variant="outlined"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: emailRegex,
              message: 'Invalid email',
            },
          })}
          error={!!errors?.email?.message}
          helperText={`${errors?.email?.message || ''}`}
        />
        <Button className="w-full" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </section>
  );
};
