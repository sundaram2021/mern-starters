import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";

function Home() {
  const [todos, setTodos] = useState({
    todo: "",
  });
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState();

  const token = localStorage.getItem("token");

  window.addEventListener("storage", function (event) {
    if (event.key === "token" && !event.newValue) {
      window.location.replace("/login");
    }
  });

  if (!token) {
    window.location.replace("/login");
  }

  const HomeGet = async () => {
    const res = await fetch("http://localhost:9090", {
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const { firstName } = await res.json();
      setName(firstName);
    }
  };

  console.log(todos.todo);

  const submitTodo = async () => {
    const res = await fetch("http://localhost:9090", {
      method: "POST",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
    });

    if (res.ok) {
      console.log("all ok");
      const { savedTodo } = await res.json();
      setTasks([...tasks, savedTodo]);
    }
  };

  useEffect(() => {
    HomeGet();
    getTodos();
  });

  function getTodos() {
    tasks.map((i) => console.log(i.todo));
  }

  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        style={{
          width: "50%",
          margin: "5rem auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{`${name}'s Todo App`}</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Add your todos..."
            multiline
            maxRows={4}
            value={todos.todo}
            onChange={(e) => setTodos({ ...todos, todo: e.target.value })}
          />
          <Stack spacing={2} direction="row" style={{ height: "54px" }}>
            <Button variant="contained" onClick={submitTodo}>
              Submit
            </Button>
          </Stack>
        </div>
      </Box>
      <ul>
        {tasks.map((item) => (
          <li key={item.createdAt}>{item.todo}</li>
        ))}
      </ul>
    </>
  );
}

export default Home;
