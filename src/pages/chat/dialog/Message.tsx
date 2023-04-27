import avatar from 'images/default-avatar.png';

interface IMessage {
  text: string;
}

export const Message = ({ text }: IMessage) => {
  return (
    <div className="flex flex-col max-w-sm">
      <div className="flex items-end">
        <img className="w-8 h-8 rounded-full mr-2" src={avatar} alt="Avatar" />
        <p className="bg-slate-800 p-3 rounded-lg">{text}</p>
      </div>
      <span className="self-end text-xs opacity-70">2 days ago</span>
    </div>
  );
};
