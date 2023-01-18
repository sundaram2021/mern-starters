import React, {useState, useEffect} from "react";
import Container from "@mui/material/Container";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

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
    <Container>
      <TransactionForm
        fetchTransaction={fetchTransaction}
        editTransaction={editTransaction}
      />
      <TransactionsList
        transactions={transactions}
        fetchTransaction={fetchTransaction}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}

export default Home;
