import clsx from 'clsx';
import { FC } from 'react';

import { IAvatarUpload } from './AvatarUpload.interface';

import defaultAvatar from 'images/default-avatar.png';

export const AvatarUpload: FC<IAvatarUpload> = ({ className }) => {
  return (
    <label
      className={clsx(
        'inline-block relative cursor-pointer rounded-full shadow-primary',
        className
      )}
    >
      <img
        className="rounded-full object-cover"
        width={90}
        height={90}
        src={defaultAvatar}
        alt="Avatar"
      />
      <input type="file" className="sr-only" multiple={false} />
      {/* <span className="w-[27px] h-[27px] flex justify-center items-center rounded-full bg-slate-500 absolute bottom-0 right-0 hover:bg-slate-600 transition-colors">
          {isUploading || isDeleting || isAvatarUpdating ? <Loader size="17" /> : <EditIcon />}
        </span> */}
    </label>
  );
};
