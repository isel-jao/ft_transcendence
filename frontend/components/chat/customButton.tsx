import { Button, Typography } from "@mui/material";
import React from "react";

interface Props {
  color?: string;
  children?: React.ReactNode;
  height?: string;
  onClick?: () => void;
  radius?: string;
  width?: string;
  title?: string;
}

const CustomButton: React.FC<Props> = ({
  color = "#161c30",
  children,
  height = "25px",
  onClick = () => {},
  radius = "6px",
  title = "",
}) => {
  return (
    <Button
      disableElevation={true}
      variant="contained"
      onClick={onClick}
      sx={{
        height: height,
        "&.MuiButton-root": {
          p: "0px",
          m: "0px",
        },
        backgroundColor: color,
        borderRadius: radius,
      }}
    >
      {children}
      <Typography
        sx={{
          color: "#479bea",
          textTransform: "none",
          fontWeight: "500",
          fontSize: "12px",
        }}
      >
        {title}
      </Typography>
    </Button>
  );
};

export default CustomButton;
