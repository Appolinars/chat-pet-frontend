import { Button, TextField } from "@mui/material";
import { FC } from "react";

export const Login: FC = () => {
  return (
    <div className="container min-h-screen flex justify-center items-center">
      <form className="max-w-lg w-full flex flex-col gap-5">
        <TextField label="Username" variant="outlined" />
        <TextField label="Email" variant="outlined" />
        <TextField label="Password" variant="outlined" />
        <TextField label="Repeat password" variant="outlined" />
        <Button className="w-full" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};
