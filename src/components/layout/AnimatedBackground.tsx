import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Particles from 'react-tsparticles';
import type { Engine } from 'tsparticles-engine';
import { loadLinksPreset } from 'tsparticles-preset-links';

import { colorTheme } from '@/providers/ThemeProvider';

export const AnimatedBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadLinksPreset(engine);
  }, []);

  return (
    <>
      <Particles
        className="absolute top-0 left-0 -z-10"
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: colorTheme.bg,
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
              value: colorTheme.accent,
            },
            links: {
              color: colorTheme.accent,
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
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
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Outlet />
    </>
  );
};
