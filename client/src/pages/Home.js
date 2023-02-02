import React, { useEffect, useState } from "react";
import "../App.css"
import { v4 as uuidv4 } from 'uuid';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";

function Home() {
  // let p = '';
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

  // console.log(todos.todo);

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
      // console.log("all ok");
      const { savedTodo } = await res.json();
      // setTasks([...tasks, savedTodo]);
      
      console.log('savedTodo => '+ savedTodo);
    }
    // console.log(res);
  };

  useEffect(() => {
    HomeGet();
    getMongodbData();
  });

  async function getMongodbData(){
    const res = await fetch('http://localhost:9090/getdata', {
      headers: {
        "x-access-token": token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // console.log("mytodos "+res.myTodos);
    // console.log("res "+ res);
    const { myTodos } = await res.json();
    // console.log(';dfjddf');
    // p = myTodos;
    setTasks(myTodos);
    setTodos({
      todo: ""
    })
  }

  // console.log("p = "+ p);

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
      <ul className="ul">
        {tasks.map((item) => (
          <li key={uuidv4()}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default Home;
