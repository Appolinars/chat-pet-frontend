import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { AvatarUpload } from '@/components/common/AvatarUpload';

import { useUpdateAvatarMutation, useUpdateUserMutation } from '@/store/auth/authApiSlice';
import { userSelector } from '@/store/auth/authSelectors';

import { useDeleteFileMutation } from '@/services/upload.service';

import { IAvatar } from '@/shared/types/user';
import { emailRegex } from '@/shared/utils';

import { useAppSelector } from '@/store';

interface IFormInputs {
  username: string;
  email: string;
}

export const Settings: FC = () => {
  const user = useAppSelector(userSelector);

  const [deleteFile] = useDeleteFileMutation();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [updateAvatar] = useUpdateAvatarMutation({
    fixedCacheKey: 'avatar-update',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: 'onBlur',
    defaultValues: {
      email: user?.email,
      username: user?.username,
    },
  });

  const onAvatarUpload = async (avatar: IAvatar) => {
    const oldAvatarId = user?.avatar?.id;
    await updateAvatar(avatar);
    if (oldAvatarId) await deleteFile(oldAvatarId);
  };

  const onAvatarDelete = async () => {
    await updateAvatar(null);
  };

  const onSubmit = async (data: IFormInputs) => {
    await updateUser(data);
  };

  return (
    <section className="container pt-11 flex flex-col justify-center items-center">
      <h1 className="text-xl lg:text-4xl text-center font-bold uppercase tracking-widest mb-5">
        Edit your details
      </h1>
      <form className="max-w-lg w-full flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <AvatarUpload
          className="self-center"
          avatar={user?.avatar}
          onAvatarUpload={onAvatarUpload}
          onAvatarDelete={onAvatarDelete}
        />
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
        <LoadingButton
          className="w-full"
          variant="contained"
          type="submit"
          loading={isLoading}
          loadingPosition="end"
        >
          Submit
        </LoadingButton>
      </form>
    </section>
  );
};
