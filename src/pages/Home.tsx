import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Home: FC = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl mb-5">
        Stay connected, stay chatting. <span className="block">Join our community today.</span>
      </h1>
      <Link className="animated-btn" to="/login">
        <span />
        <span />
        <span />
        <span />
        Get started
      </Link>
    </section>
  );
};
