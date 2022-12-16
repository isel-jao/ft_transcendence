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
import { createChannel } from "../../services/conversations";
import { status } from "../../types";
import { useConversations } from "../../hooks/useConversations";
import CustomButton from "./customButton";
import { useSnackbar } from "notistack";

//TODO update types
const CreateChannelForm = (props: { on: any; hide: any; refetch: any }) => {
  const { on, hide, refetch } = props;
  const { enqueueSnackbar: showMessage, closeSnackbar } = useSnackbar();
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
      .required("required channel name"),
    status: Yup.mixed().oneOf([
      status.PRIVATE,
      status.PROTECTED,
      status.PUBLIC,
    ]),
    password: Yup.string().when("status", {
      is: (status: any) => status != "PUBLIC",
      then: Yup.string()
        .min(2, "Too short!")
        .max(20, "Too long!")
        .required("required password"),
      otherwise: Yup.string().min(2, "Too short!").max(20, "Too long!"),
    }),
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
      //TODO to get the user_id it from the auth or a userContext
      createChannel({ ...values, user_id: 1 })
        .then((res) => {
          showMessage("channel created successfully", { variant: "success" });
          refetch();
        })
        .catch((err) => {
          console.log(err);
          showMessage(err.error, { variant: "error" });
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

        {formik.errors.name && formik.touched.name && (
          <Typography variant="body2" sx={{ color: "red" }}>
            {formik.errors.name}
          </Typography>
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
          formik.touched.password && (
            <Typography sx={{ color: "red", fontWeight: "6px" }}>
              {formik.errors.password}
            </Typography>
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
              name="status"
              value={status.PUBLIC}
              control={<Radio sx={RadioStyle} />}
              label="Public"
            />
            <FormControlLabel
              name="status"
              value={status.PROTECTED}
              control={<Radio sx={RadioStyle} />}
              label="Protected"
            />
            <FormControlLabel
              name="status"
              value={status.PRIVATE}
              control={<Radio sx={RadioStyle} />}
              label="Private"
            />
          </RadioGroup>
        </FormControl>

        <DialogActions>
          <CustomButton
            onClick={() => {
              hide();
              formik.resetForm();
            }}
            title={"Cancel"}
          />
          <CustomButton onClick={formik.submitForm} title={"Create"} />
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CreateChannelForm;
