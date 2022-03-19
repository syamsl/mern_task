import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { edit, getUser, getUsers, deleteUser } from "../pages/screen/screenSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Filter: FC = () => {
  const dispatch = useDispatch();
  const [editStatus, setEditStatus] = useState<boolean>(false);
  const users = useSelector((state: RootState) => state.data.users);
  

  const handleEdit = async (id: any) => {
    const response = await dispatch(getUser(id));
    if (!!response) {
      dispatch(edit(true));
    }
  };

  const handleDelete = async (id: any) => {
    const response = await dispatch(deleteUser(id));
    if (!!response) {
      dispatch(getUsers());
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Job Type</TableCell>
              <TableCell align="center">Pre. Location</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: any, index: any) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="center">{row.fullName}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.mobile}</TableCell>
                <TableCell align="center">{row.job}</TableCell>
                <TableCell align="center">{row.place}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ padding: "2px 0px", margin: "0px 5px" }}
                    onClick={() => {
                      handleEdit(row._id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ padding: "2px 15px", margin: "0px 5px" }}
                    onClick={() => {
                      handleDelete(row._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Filter;
