import React, { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import {
  createNewUser,
  editUser,
  getUsers,
  edit,
} from "../pages/screen/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../app/store";
toast.configure();

const Form: FC = () => {
  const dispatch = useDispatch();
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    new Date(Date.now())
  );
  const [userId, setuserId] = useState<string>("");
  const [jobState, setJobState] = useState<string>("FT");
  const [placeState, setPlaceState] = useState<string>("");
  const [image, setImage] = useState<string>("");
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
    if (editStatus) {
      const result = { ...data, dateOfBirth, id: userId };
      dispatch(editUser(result));
    } else {
      const result = { ...data, dateOfBirth };
      dispatch(createNewUser(result));
    }
    dispatch(edit(false));
    reset();
  };

  const changeHandler = (event: any) => {
    console.log(event.target.files[0]);
  };

  const handleChange = (newValue: Date | null) => {
    setDateOfBirth(newValue);
  };

  const handleJobChange = (newValue: string) => {
    setJobState(newValue);
  };

  const handlePlaceChange = (newValue: string) => {
    setPlaceState(newValue);
  };

  const handleProfilePicture = (e: any) => {
    const file = e.target.files[0];

  };

  useEffect(() => {
    if (editStatus) {
      reset(editData.user);
      setDateOfBirth(editData.user.dateOfBirth);
      setJobState(editData.user.job);
      setPlaceState(editData.user.place);
      setuserId(editData.user._id);
    }
    dispatch(getUsers());
  }, [editStatus, editData.user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} justifyContent="center">
          <TextField
            error={!!errors.fullName}
            helperText={
              errors.fullName && <span>{errors.fullName.message}</span>
            }
            label="Full Name"
            type="text"
            placeholder="Full name"
            InputLabelProps={{ shrink: true }}
            {...register("fullName", {
              required: "This is required!",
              minLength: { value: 2, message: "Min 2 characters" },
              maxLength: {
                value: 10,
                message: "Must be 10 characters or less",
              },
            })}
          />
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
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
              value={jobState}
              defaultValue="FT"
            >
              <FormControlLabel
                value="FT"
                {...register("job", { required: true })}
                control={<Radio />}
                onChange={() => {
                  handleJobChange("FT");
                }}
                label="FT"
              />
              <FormControlLabel
                value="PT"
                {...register("job", { required: true })}
                control={<Radio />}
                onChange={() => {
                  handleJobChange("PT");
                }}
                label="PT"
              />
              <FormControlLabel
                value="Consultant"
                {...register("job", { required: true })}
                control={<Radio />}
                onChange={() => {
                  handleJobChange("Consultant");
                }}
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
              value={placeState}
              {...register("place", { required: true })}
            >
              <MenuItem
                value="Chennai"
                onClick={() => handlePlaceChange("Chennai")}
              >
                Chennai
              </MenuItem>
              <MenuItem
                value="Trivandrum"
                onClick={() => handlePlaceChange("Trivandrum")}
              >
                Trivandrum
              </MenuItem>
              <MenuItem
                value="Kochi"
                onClick={() => handlePlaceChange("Kochi")}
              >
                Kochi
              </MenuItem>
              <MenuItem
                value="Bangalore"
                onClick={() => handlePlaceChange("Bangalore")}
              >
                Bangalore
              </MenuItem>
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
