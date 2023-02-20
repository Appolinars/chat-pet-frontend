import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "./ThemeProvider";

export const MainProvider: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
