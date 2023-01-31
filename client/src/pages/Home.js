import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function Home() {
  const [todo, setTodo] = useState();
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

  console.log(todo);

  const submitTodo = async () => {
    const res = await fetch("http://localhost:9090", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("all ok");
      const {savedTodo} = await res.json();
      console.log(savedTodo);
    }
  };

  useEffect(() => {
    // console.log("useEffect...");
    HomeGet();
  });

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
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Stack spacing={2} direction="row" style={{ height: "54px" }}>
            <Button variant="contained" onClick={submitTodo}>
              Submit
            </Button>
          </Stack>
        </div>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {[0, 1, 2, 3, 4].map((sectionId) => (
            <li key={`section-${sectionId}`}>
              <ul>
                {/* <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader> */}
                {[0, 1, 2].map((item) => (
                  <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemText primary={`Item ${item}`} />
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      </Box>
    </>
  );
}

export default Home;
