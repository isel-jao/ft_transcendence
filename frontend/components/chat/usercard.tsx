import React, { useState } from "react";
import { Box, Typography, Avatar, Divider } from "@mui/material";
import { IFuser } from "../../types";
import { useRouter } from "next/router";

const usercard = (props: { user: IFuser; handelUserChange: Function }) => {
  const { user, handelUserChange } = props;
  const [selectedUserId, setSelectedUserId] = useState<number>();

  return (
    <Box
      onClick={() => {
        handelUserChange(user);
        setSelectedUserId(user.id);
      }}
      sx={{
        display: "flex",
        gap: "10px",
        padding: "4px 0px",
        m: "8px 4px",
        p: "4px 10px",
        backgroundColor: "#F9FAFC",
        borderLeft: "2px solid #00B0B6",
        cursor: "pointer",
      }}
    >
      <Avatar sx={{ width: 24, height: 24 }} />
      <Typography>{user.name}</Typography>
    </Box>
  );
};

export default usercard;
