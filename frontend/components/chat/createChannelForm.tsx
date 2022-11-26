import React from "react";
import {
  Box,
  Typography,
  Divider,
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
// import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postChannel } from "../../services/conversations";
import { status } from "../../types";
import { useConversations } from "../../hooks/useConversations";

//TODO update types
const CreateChannelForm = (props: { on: any; hide: any; refetch: any }) => {
  const { on, hide, refetch } = props;
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
    password: Yup.string().min(2, "Too short!").max(20, "Too long!"),
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
      postChannel(values)
        .then((res) => {
          // enqueueSnackbar("");
          console.log(res);
          refetch();
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

        {formik.errors.name && formik.touched.name ? (
          <Typography variant="body2" sx={{ color: "red" }}>
            {formik.errors.name}
          </Typography>
        ) : (
          ""
        )}

        {formik.values.status != status.PUBLIC && (
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
        )}
        {formik.values.status != status.PUBLIC &&
        formik.errors.password &&
        formik.touched.password ? (
          <Typography variant="body2" sx={{ color: "red" }}>
            {formik.errors.password}
          </Typography>
        ) : (
          ""
        )}

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
              value={status.PUBLIC}
              control={<Radio sx={RadioStyle} />}
              label="Public"
            />
            <FormControlLabel
              value={status.PROTECTED}
              control={<Radio sx={RadioStyle} />}
              label="Protected"
            />
            <FormControlLabel
              value={status.PRIVATE}
              control={<Radio sx={RadioStyle} />}
              label="Private"
            />
          </RadioGroup>
        </FormControl>

        <DialogActions>
          <Button
            onClick={() => {
              hide();
              formik.resetForm();
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
