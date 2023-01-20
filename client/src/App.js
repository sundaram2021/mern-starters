import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/auth";
import Cookies from "js-cookie";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(auth);

  const fetchUser = async () => {
    setIsLoading(true);
    const token = Cookies.get("token");

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
  };

  useEffect(() => {
    fetchUser()
  }, []);

  if(isLoading){
    return <p>Loading....</p>
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
