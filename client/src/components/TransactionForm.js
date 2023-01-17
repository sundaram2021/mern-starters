import { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CardContent from "@mui/material/CardContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function TransactionForm({ fetchTransaction }) {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: Date.now(),
  });
  //   const [transactions, setTransactions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("hello form");
    const res = await fetch("http://localhost:9090/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    // const data = await res.json();
    // console.log("data-fetched");
    if (res.ok) {
      fetchTransaction(fetchTransaction);
      setForm({ amount: 0, description: "", date: "" });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: "10px" }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Add new Transaction</Typography>
          <TextField
            sx={{ marginRight: "8px" }}
            id="outlined-basic"
            label="Amount"
            name="amount"
            variant="outlined"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginRight: "8px" }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ marginRight: "8px" }}
              label="Enter date"
              name="date"
              value={form.date}
              onChange={handleDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
