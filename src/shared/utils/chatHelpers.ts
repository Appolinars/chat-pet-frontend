import { IChatUser } from '../types/chat';

export const timeAgo = (timeString: string) => {
  if (!timeString) return null;

  const now = new Date();
  const time = new Date(timeString);
  const diff = +now - +time;
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
};

export const getPartner = (userId: string, chatUsers: IChatUser[]) => {
  return chatUsers[0]._id === userId ? chatUsers[1] : chatUsers[0];
};
