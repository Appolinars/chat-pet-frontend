import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadLinksPreset } from "tsparticles-preset-links";
import type { Engine } from "tsparticles-engine";
import { lightTheme } from "../config/theme";

export const Home: FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadLinksPreset(engine);
  }, []);
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
      <Particles
        className="-z-10"
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: lightTheme.bg,
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              resize: true,
            },
          },
          particles: {
            color: {
              value: lightTheme.accent,
            },
            links: {
              color: lightTheme.accent,
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 55,
            },
            opacity: {
              value: 0.4,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </section>
  );
};
