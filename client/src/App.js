import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "./store/auth";
import Cookies from "js-cookie";

function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    setIsLoading(true);
    

    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // setIsAuthenticated(res.ok);

    if (res.ok) {
      const user = await res.json();
      console.log(user);
      dispatch(getUser(user));
    }
    setIsLoading(false)
  };

  useEffect(() => {
    fetchUser()
  }, []);

  if(isLoading){
    return <h1 style={{textAlign: "center"}}>Loading....</h1>
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
