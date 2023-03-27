import { Button, TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { AvatarUpload } from '@/components/common/avatarUpload/AvatarUpload';

import { emailRegex } from '@/shared/utils';

interface IFormInputs {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export const Register: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'onBlur' });
  const watchPassword = watch('password', '');

  const onSubmit = (data: any) => console.log(data);
  return (
    <section className="container min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl lg:text-4xl text-center font-bold uppercase tracking-widest mb-5">Register</h1>
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
        <TextField
          label="Password"
          variant="outlined"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Min length must be at least 5 characters',
            },
          })}
          error={!!errors?.password?.message}
          helperText={`${errors?.password?.message || ''}`}
        />
        <TextField
          label="Repeat password"
          variant="outlined"
          {...register('passwordRepeat', {
            required: 'Password repeat is required',
            minLength: {
              value: 5,
              message: 'Min length must be at least 5 characters',
            },
            validate: (value: string) => {
              if (watchPassword !== value) {
                return 'Your passwords do no match';
              }
            },
          })}
          error={!!errors?.passwordRepeat?.message}
          helperText={`${errors?.passwordRepeat?.message || ''}`}
        />
        <Button className="w-full" variant="contained" type="submit">
          Submit
        </Button>
        <p className="text-lg">
          Already have an account?{' '}
          <Link className="text-accentColor hover-undreline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
};
