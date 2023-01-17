import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Container from '@mui/material/Container';
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
import "./index.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    const res = await fetch("http://localhost:9090/transaction");
    const { data } = await res.json();
    // console.log("data = " + data);
    // console.log(res);
    setTransactions(data);
  };

  return (
    <>
      <Navbar />
      <Container>
        <TransactionForm fetchTransaction={fetchTransaction} />
        <TransactionsList transactions={transactions} />
      </Container>
    </>
  );
}

export default App;
