import { CircularProgress } from '@mui/material';
import clsx from 'clsx';
import { ChangeEvent, FC, MouseEvent, useRef } from 'react';
import { toast } from 'react-toastify';

import { useUpdateAvatarMutation } from '@/store/auth/authApiSlice';

import { useDeleteFileMutation, useUploadFileMutation } from '@/services/upload.service';

import { IAvatar } from '@/shared/types/user';
import { errorCatch } from '@/shared/utils';

import defaultAvatar from 'images/default-avatar.png';

import { ReactComponent as EditIcon } from 'svg/edit.svg';
import { ReactComponent as TrashIcon } from 'svg/trash.svg';

interface IAvatarUpload {
  avatar: IAvatar | null | undefined;
  onAvatarUpload: (payload: IAvatar) => void;
  onAvatarDelete: () => void;
  className?: string;
}

export const AvatarUpload: FC<IAvatarUpload> = ({
  className,
  avatar,
  onAvatarUpload,
  onAvatarDelete,
}) => {
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [deleteFile, { isLoading: isDeleting }] = useDeleteFileMutation();
  const [_, { isLoading: isUpdating }] = useUpdateAvatarMutation({
    fixedCacheKey: 'avatar-update',
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const uploadedFile = await uploadFile(formData).unwrap();
      onAvatarUpload(uploadedFile);
    } catch (error) {
      const message = errorCatch(error);
      toast.error(message);
    }
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const deleteResponse = await deleteFile(avatar?.id || '').unwrap();
      deleteResponse?.message === 'success' ? onAvatarDelete() : toast.info(deleteResponse.message);
    } catch (error) {
      const message = errorCatch(error);
      toast.error(message);
    }
  };

  const loading = isUploading || isDeleting || isUpdating;

  return (
    <div className={clsx('inline-block relative rounded-full shadow-primary', className)}>
      <label className="cursor-pointer">
        <img
          className="rounded-full object-cover w-[90px] h-[90px]"
          width={90}
          height={90}
          src={avatar?.url || defaultAvatar}
          alt="Avatar"
        />
        <input
          ref={inputRef}
          type="file"
          value=""
          className="sr-only"
          multiple={false}
          onChange={handleChange}
        />
        <span className="w-[27px] h-[27px] flex justify-center items-center rounded-full bg-slate-500 absolute bottom-0 right-0 hover:bg-slate-600 transition-colors">
          {loading ? <CircularProgress size={17} /> : <EditIcon />}
        </span>
      </label>
      {avatar?.id && (
        <button
          className="absolute -top-4 -right-4 hover:scale-125 transition-transform will-change-transform"
          onClick={handleDelete}
          type="button"
          aria-label="Delete avatar"
          disabled={loading}
        >
          <TrashIcon className="stroke-red-500" />
        </button>
      )}
    </div>
  );
};
