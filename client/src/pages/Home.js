import React, {useState, useEffect} from "react";
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

  const fetchTransaction = async () => {
    const token = Cookies.get('token')
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
    headers: {
      Authorization: `Bearer ${token}`
    }  
    });
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
