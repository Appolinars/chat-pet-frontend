import { colorTheme } from '@/providers/ThemeProvider';

export const ChatIcon = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      y="0"
      x="0"
      xmlns="http://www.w3.org/2000/svg"
      width="70px"
      height="70px"
    >
      <path
        className="animate-[breath_3s_linear_-1.9s_infinite_normal_forwards_running] origin-center will-change-transform"
        strokeMiterlimit="10"
        strokeWidth="4"
        stroke={colorTheme.accent}
        fill={colorTheme.bg}
        d="M72.903 14.078H15.427c-4.247 0-7.927 3.078-7.927 7.326v29.952c0 4.247 3.679 8.055 7.927 8.055h6.24v14.091c6.611-2.188 11.916-7.48 13.731-14.091h37.505c4.247 0 7.319-3.808 7.319-8.055V21.403c0-4.247-3.072-7.325-7.319-7.325z"
      />
      <path
        className="animate-[breath_3s_linear_-2.2s_infinite_normal_forwards_running] origin-center will-change-transform"
        fill={colorTheme.accent}
        d="M85.852 25.872V51.59c0 6.901-6.101 12.503-13.059 12.503H38.602c-1.074 2.849-2.545 4.611-4.36 6.656.704.214 1.45-.008 2.224-.008h28.455c1.825 7.598 6.685 13.13 14.282 15.329V70.742h3.083c5.772 0 10.213-3.988 10.213-9.759V33.681c.001-4.155-2.848-7.546-6.647-7.809z"
      />
      <circle
        className="animate-[breath_3s_linear_-2.4s_infinite_normal_forwards_running] origin-center will-change-transform"
        fill={colorTheme.accent}
        r="4.5"
        cy="37"
        cx="23.7"
      />
      <circle
        className="animate-[breath_3s_linear_-2.7s_infinite_normal_forwards_running] origin-center will-change-transform"
        fill={colorTheme.accent}
        r="4.5"
        cy="37"
        cx="43.5"
      />
      <circle
        className="animate-[breath_3s_linear_-3s_infinite_normal_forwards_running] origin-center will-change-transform"
        fill={colorTheme.accent}
        r="4.5"
        cy="37"
        cx="63.3"
      />
    </svg>
  );
};
