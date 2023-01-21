import * as React from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TransactionsList({
  data,
  fetchTransaction,
  setEditTransaction,
}) {
  const deletehandler = async (id) => {
    const token = Cookies.get("token");
    if (!window.confirm("Are you sure")) return;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      
    );

    if (res.ok) {
      fetchTransaction();
      window.alert("Deleted Sucessfully");
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD-MMM, YYYY");
  };

  return (
    <>
      <Typography sx={{ marginTop: "10px" }} variant="h6">
        List of Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.amount}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => setEditTransaction(row)}
                  >
                    <EditSharpIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    component="label"
                    onClick={() => deletehandler(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
