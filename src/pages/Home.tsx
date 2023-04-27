import { userSelector } from '../store/auth/auth.selectors';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../store';

export const Home= () => {
  const user = useAppSelector(userSelector);

  return (
    <section className="text-center flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl mb-5">
        Stay connected, stay chatting. <span className="block">Join our community today.</span>
      </h1>
      <Link className="animated-btn" to={user ? '/chat' : '/login'}>
        <span />
        <span />
        <span />
        <span />
        Get started
      </Link>
    </section>
  );
};
