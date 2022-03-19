import React, { FC, useState, useEffect } from "react";
import { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers } from "./screenSlice";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Form from "../../components/Form";
import Filter from "../../components/Filter";

const useStyles = makeStyles({
  boxContainer: {
    paddingLeft: "250px",
    paddingRight: "250px",
    paddingTop: "50px",
  },
});

const Registration: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={classes.boxContainer}>
      <h1>Registration</h1>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          border: "1px solid #e0e0e0",
          borderRadius: "5px",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "30px" }}>
          <Form />
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "15px" }}>
          <Filter />
        </Box>
      </Box>
    </div>
  );
};

export default Registration;
