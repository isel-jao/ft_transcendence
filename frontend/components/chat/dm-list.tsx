import React from "react";
import { Box, Typography } from "@mui/material";
import DmCard from "./dmCard";

//TODO mocked data here
const dms = [
  {
    conversation_id: 1,
    status: "active",
    name: "ymarji",
  },
  {
    conversation_id: 2,
    status: "active",
    name: "youchennou",
  },
  {
    conversation_id: 3,
    status: "active",
    name: "moharras",
  },
  {
    conversation_id: 4,
    status: "active",
    name: "misaki",
  },
];

const DmList = () => {
  return (
    <Box>
      {dms.map((item) => (
        <DmCard dm={item} />
      ))}
    </Box>
  );
};

export default DmList;
