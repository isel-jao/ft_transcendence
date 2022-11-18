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
  FormHelperText,
} from "@mui/material";
import { Dialog, DialogTitle } from "../../hooks/useDialogue";
// import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postChannel } from "../../services/conversations";
import { status } from "../../types";

//TODO update types
const CreateChannelForm = (props: { on: any; hide: any }) => {
  const { on, hide } = props;
  // const { enqueueSnackbar } = useSnackbar();
  const RadioStyle = {
    "& .MuiSvgIcon-root": {
      fontSize: 20,
    },
  };

  //TODO check why validation not working
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too short!")
      .max(20, "Too long!")
      .required("Required"),
    password: Yup.string()
      .min(2, "Too short!")
      .max(20, "Too long!")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      type: "room",
      status: status.PUBLIC,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log({ values });
      postChannel(values)
        .then((res) => {
          // enqueueSnackbar("");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          // enqueueSnackbar(err, { variant: "error" });
        })
        .finally(() => {
          resetForm();
          hide();
        });
    },
  });

  return (
    <Dialog open={on} onClose={hide}>
      <DialogTitle title="create new channel" />
      <Divider sx={{ backgroundColor: "#632DE9" }} />
      <Box sx={{ p: "10px 20px", display: "grid", gap: "30px" }}>
        <TextField
          sx={{
            color: "#fff",
            "& .MuiInput-input": {
              color: "#fff",
            },
          }}
          label="channel name"
          variant="standard"
          fullWidth
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {/* 
        {formik.errors.name && formik.touched.name ? (
          <Typography variant="body2">{formik.errors.name}</Typography>
        ) : (
          ""
        )} */}

        <TextField
          sx={{
            color: "#fff",
            "& .MuiInput-input": {
              color: "#fff",
            },
          }}
          type="password"
          label="password"
          variant="standard"
          fullWidth
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {/* <FormHelperText>
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : ""}
        </FormHelperText> */}

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Channel Type
          </FormLabel>
          <RadioGroup
            row
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
          >
            <FormControlLabel
              value={"PUBLIC"}
              control={<Radio sx={RadioStyle} />}
              label="Public"
            />
            <FormControlLabel
              value={status.PROTECTED}
              control={<Radio sx={RadioStyle} />}
              label="Protected"
            />
            <FormControlLabel
              value={2}
              control={<Radio sx={RadioStyle} />}
              label="Private"
            />
          </RadioGroup>
          {/* <FormHelperText>
            {formik.errors.type && formik.touched.type
              ? formik.errors.type
              : ""}
          </FormHelperText> */}
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
