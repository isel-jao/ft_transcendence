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
  Button,
  Radio,
} from "@mui/material";
import { Dialog, DialogTitle } from "../../hooks/useDialogue";
import { useFormik } from "formik";

//TODO update types
const CreateChannelForm = (props: { on: any; hide: any }) => {
  const { on, hide } = props;
  const RadioStyle = {
    "& .MuiSvgIcon-root": {
      fontSize: 20,
    },
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      type: "",
    },
    onSubmit: (values) => {
      console.log({ values });
      console.log("implement submit ");
    },
  });

  return (
    <Dialog open={on} onClose={hide}>
      <DialogTitle title="create new channel" />
      <Divider sx={{ backgroundColor: "#632DE9" }} />
      <Box sx={{ p: "10px 20px", display: "grid", gap: "30px" }}>
        <TextField
          label="channel name"
          variant="standard"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ color: "#fff" }}
          label="password"
          variant="standard"
          fullWidth
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Channel Type
          </FormLabel>
          <RadioGroup row>
            <FormControlLabel
              value="Public"
              control={<Radio sx={RadioStyle} />}
              label="Public"
            />
            <FormControlLabel
              value="Protected"
              control={<Radio sx={RadioStyle} />}
              label="Male"
            />
            <FormControlLabel
              value="Private"
              control={<Radio sx={RadioStyle} />}
              label="Private"
            />
          </RadioGroup>
        </FormControl>

        <DialogActions>
          <Button
            onClick={() => {
              hide();
            }}
            sx={{
              color: "#fff",
              backgroundColor: "#6344D9",
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "#fff",
              backgroundColor: "#6344D9",
            }}
            onClick={formik.submitForm}
          >
            Create
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateChannelForm;
