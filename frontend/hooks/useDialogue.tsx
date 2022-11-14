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
  const { fullWidth = true, maxWidth = "md", ...restProps } = props;
  return (
    <MuiDialog fullWidth={fullWidth} maxWidth={maxWidth} {...restProps}>
      {props.children}
    </MuiDialog>
  );
}

export function DialogTitle(props: { title: string }) {
  return (
    <MuiDialogTitle>
      <Typography sx={{ textTransform: "capitalize", textAlign: "center" }}>
        {props.title}
      </Typography>
    </MuiDialogTitle>
  );
}
