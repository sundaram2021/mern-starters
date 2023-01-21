import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import Cookies from "js-cookie";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    console.log('jhj');
    const token = await Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('after fetch');
    console.log("after response = "+ res);
    const { dataResponse }  = await res.json();
    console.log('after data');
    console.log("data " + dataResponse);
    setTransactions(dataResponse);
  }
  return (
    <Container>
      <TransactionForm
        fetchTransaction={fetchTransaction}
        editTransaction={editTransaction}
      />
      <TransactionsList
        data={transactions}
        fetchTransaction={fetchTransaction}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}

export default Home;
