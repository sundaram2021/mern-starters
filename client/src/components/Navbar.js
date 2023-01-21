import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout} from "../store/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const _logout = () => {
    Cookies.remove("token");
    dispatch(logout())
    navigate("/login")
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-white">
              Expense Tracker
            </Link>
          </Typography>
          <Button color="inherit" onClick={_logout}>
            LogOut
          </Button>
          <Link to="/login" className="text-white">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" className="text-white">
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
// export default AppBar
