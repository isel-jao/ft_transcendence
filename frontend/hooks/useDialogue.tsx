import { Box } from "@mui/system";
import React, { useState } from "react";
import MuiDialog, { DialogProps } from "@mui/material/Dialog";
import { DialogTitle as MuiDialogTitle } from "@mui/material";
import Typography from "@mui/material/Typography";

export function useDialog() {
  const [on, setOn] = useState(false);
  const show = () => setOn(true);
  const hide = () => setOn(false);
  const toggle = () => setOn(!on);

  return {
    on,
    show,
    hide,
    toggle,
  };
}

export function Dialog(props: DialogProps) {
  const { fullWidth = true, maxWidth = "xs", ...restProps } = props;
  return (
    <MuiDialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      {...restProps}
      PaperProps={{
        style: {
          backgroundColor: "#1b1625",
          boxShadow: "none",
        },
      }}
    >
      {props.children}
    </MuiDialog>
  );
}

export function DialogTitle(props: { title: string }) {
  return (
    <MuiDialogTitle>
      <Typography
        sx={{
          textTransform: "capitalize",
          textAlign: "center",
          color: "#479FF0",
        }}
      >
        {props.title}
      </Typography>
    </MuiDialogTitle>
  );
}
