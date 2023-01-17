import React, { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });

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
      fetchTransaction();
      setForm({ amount: 0, description: "" , date: ""});
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleInput}
          placeholder="enter transaction amount..."
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleInput}
          placeholder="Enter transaction details..."
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInput}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <section>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trn) => {
              return (
                <tr key={trn._id}>
                  <td>{trn.amount}</td>
                  <td>{trn.description}</td>
                  <td>{trn.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
