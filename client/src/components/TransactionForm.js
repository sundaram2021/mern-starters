import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CardContent from "@mui/material/CardContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function TransactionForm({}) {
  return (
    <Card sx={{ minWidth: 275, marginTop: "10px" }}>
      <CardContent>
        <form>
          <Typography variant="h6">Add new Transaction</Typography>
          <TextField
            sx={{ marginRight: "8px" }}
            id="outlined-basic"
            label="Amount"
            name="amount"
            variant="outlined"
          />
          <TextField
            sx={{ marginRight: "8px" }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="description"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginRight: "8px" }}
              label="Enter date"
              name="date"
            />
          </LocalizationProvider>
          {/* {(editTransaction.amount !== undefined) ? (
            <Button
              type="submit"
              variant="text"
              style={{ height: "55px", fontSize: "1.2rem" }}
            >
              Update
            </Button>
          ): */}

          <Button
            type="submit"
            variant="contained"
            style={{ height: "55px", fontSize: "1.2rem" }}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
