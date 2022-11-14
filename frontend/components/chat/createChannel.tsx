import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  TextField,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const createChannel = () => {
  return (
    <Box>
      <Dialog open={on} onClose={hide}>
        <DialogTitle title="create new channel" />
        <Divider sx={{ backgroundColor: "#632DE9" }} />
        <Box sx={{ p: "10px 20px", display: "grid", gap: "10px" }}>
          <TextField label="channel name" variant="standard" fullWidth />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Channel Type
            </FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="Public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="Protected"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="Private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>

          <TextField label="password" variant="standard" fullWidth />
          <DialogActions></DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default createChannel;
