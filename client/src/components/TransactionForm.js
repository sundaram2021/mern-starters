import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CardContent from "@mui/material/CardContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

export default function TransactionForm({ fetchTransaction, editTransaction }) {
  const [form, setForm] = useState({
    amount: null,
    description: "",
    date: "",
  });

  useEffect(() => {
    if (editTransaction.amount !== {}) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    editTransaction.amount === undefined ? create() : update();

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDate = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  const create = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    reload(res);
  };

  const update = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    reload(res);
  };

  function reload(res) {
    if (res.ok) {
      fetchTransaction(fetchTransaction);
      setForm({ amount: null | String, description: "", date: "" });
    }
  }

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
          {(editTransaction.amount !== undefined) ? (
            <Button
              type="submit"
              variant="text"
              style={{ height: "55px", fontSize: "1.2rem" }}
            >
              Update
            </Button>
          ):
           (
            <Button
              type="submit"
              variant="contained"
              style={{ height: "55px", fontSize: "1.2rem" }}
            >
              Submit
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
