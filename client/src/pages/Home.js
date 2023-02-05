import React, { useEffect, useState } from "react";
import "../App.css";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { BiEdit } from "react-icons/bi";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";

function Home() {
  const [todoId, setTodoId] = useState();
  const [submitBtn, setSubmitBtn] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [todos, setTodos] = useState({
    todo: "",
  });
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState();

  const token = localStorage.getItem("token");

  window.addEventListener("storage", function(event) {
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
    if (!submitBtn) {
      console.log(todos.todo);
      // const { todo } = todos;
      const res = await fetch(`http://localhost:9090/${todoId}`, {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if(res.ok){
        console.log('Todo edited')
        window.location.reload(true);
      }
      return;
    }

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

      console.log("savedTodo => " + savedTodo);
    }
    setRefresh(true);
  };

  useEffect(() => {
    HomeGet();
    getMongodbData();
  }, []);

  async function getMongodbData() {
    const res = await fetch("http://localhost:9090/getdata", {
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
      todo: "",
    });
  }

  if (refresh) {
    window.location.reload(true);
  }

  const editHandler = async (id) => {
    setSubmitBtn(false);
    setTodoId(id)
    const getTodo = tasks.filter((task) => task._id === id);
    const myTodo = getTodo[0].todo;
    // console.log(myTodo, getTodo)

    setTodos({ ...todos, todo: myTodo });
    // console.log(todos.todo)
  };

  const deleteHandler = async (id) => {
    console.log(id);
    const res = await fetch(`http://localhost:9090/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("todo deleted");
      window.location.reload(true);
    }
  };

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
              {submitBtn ? "Submit" : "Modify"}
            </Button>
          </Stack>
        </div>
      </Box>
      <ul className="ul">
        {tasks.map((item) => (
          <li key={uuidv4()}>
            {item.todo} &nbsp;&nbsp;&nbsp;
            <DeleteIcon onClick={() => deleteHandler(item._id)} />
            &nbsp;&nbsp;&nbsp;
            <BiEdit className="size" onClick={() => editHandler(item._id)} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
