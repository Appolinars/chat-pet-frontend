import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useLoginMutation } from '@/store/auth/authApi.slice';

import { emailRegex } from '@/shared/utils';

interface IFormInputs {
  email: string;
  password: string;
}

export const Login= () => {
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ mode: 'onBlur' });

  const onSubmit = async (data: IFormInputs) => {
    await login(data);
  };

  return (
    <section className="container min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl lg:text-4xl text-center font-bold uppercase tracking-widest mb-5">
        Login
      </h1>
      <form className="max-w-lg w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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

        <LoadingButton
          className="w-full"
          variant="contained"
          type="submit"
          loading={isLoading}
          loadingPosition="end"
        >
          Login
        </LoadingButton>
        <p className="text-lg">
          Don't have an account?{' '}
          <Link className="text-accentColor hover-undreline" to="/register">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};
