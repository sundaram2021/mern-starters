import React, { useState } from "react";

function App() {
  const [form, setForm] = useState({
    amount: 0,
    description: "",
    date: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("hello form");
    const res = await fetch("http://localhost:9090/transaction"), {
        method: "POST",
        body: form
    }

    console.log(res);
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
    </div>
  );
}

export default App;
