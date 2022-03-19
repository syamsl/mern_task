import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  InputLabel,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../pages/screen/screenSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../app/store";
toast.configure();

const Form: FC = () => {
  const dispatch = useDispatch();
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(
    new Date(Date.now())
  );
  const { editStatus, editData } = useSelector((state: RootState) => ({
    ...state.data,
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    const result = { ...data, dateOfBirth };
    console.log(result);
    dispatch(createNewUser(result));
    reset();
  };

  const changeHandler = (event: any) => {
    console.log(event.target.files[0]);
  };

  const handleChange = (newValue: Date | null) => {
    setDateOfBirth(newValue);
  };

  const handleProfilePicture = (e: any) => {
    console.log("clicked");
  };

  useEffect(() => {
    if (editStatus) {
      reset(editData.user);
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} justifyContent="center">
          {/* <Controller
            render={({
              field: { name, value, onChange },
            }) => ( */}
              <TextField
                error={!!errors.fullName}
                helperText={
                  errors.fullName && <span>{errors.fullName.message}</span>
                }
                label="Full Name"
                type="text"
                placeholder="Full name"
                {...register("fullName", {
                  required: "This is required!",
                  minLength: { value: 2, message: "Min 2 characters" },
                  maxLength: {
                    value: 10,
                    message: "Must be 10 characters or less",
                  },
                })}
              />
            {/* )}
            name="TextField"
            control={control}
            defaultValue=""
          /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction="row" spacing={2}>
            <Button component="label">
              <Avatar
                alt="/public/profile.jpg"
                src="https://images.unsplash.com/photo-1594751543129-6701ad444259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                sx={{ width: 100, height: 100 }}
                onClick={(e) => {
                  handleProfilePicture(e);
                }}
              />
              <input type="file" hidden onChange={changeHandler} />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.mobile}
            helperText={errors.mobile && <span>{errors.mobile.message}</span>}
            label="Mobile"
            type="number"
            placeholder="Mobile number"
            {...register("mobile", {
              required: "Mobile number is required",
              minLength: {
                value: 10,
                message: "Mobile number must be 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Mobile number must be 10 digits",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Please enter numbers only",
              },
              valueAsNumber: true,
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={!!errors.email}
            helperText={errors.email && <span>{errors.email.message}</span>}
            label="Email"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Job Type</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="FT"
            >
              <FormControlLabel
                value="FT"
                {...register("job", { required: true })}
                control={<Radio />}
                defaultChecked={true}
                label="FT"
              />
              <FormControlLabel
                value="PT"
                {...register("job", { required: true })}
                control={<Radio />}
                label="PT"
              />
              <FormControlLabel
                value="Consultant"
                {...register("job", { required: true })}
                control={<Radio />}
                label="Consultant"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="DOB"
              inputFormat="dd/MM/yyyy"
              value={dateOfBirth}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              // {...register("date", {required:true})}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl style={{ minWidth: 240 }} error={!!errors.place}>
            <InputLabel id="label-id">Place</InputLabel>
            <Select
              labelId="label-id"
              id="select-id"
              label="Place"
              defaultValue=""
              {...register("place", { required: true })}
            >
              <MenuItem value="Chennai">Chennai</MenuItem>
              <MenuItem value="Trivandrum">Trivandrum</MenuItem>
              <MenuItem value="Kochi">Kochi</MenuItem>
              <MenuItem value="Bangalore">Bangalore</MenuItem>
            </Select>
            <FormHelperText>
              {errors.place && <span>Place is required.</span>}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
