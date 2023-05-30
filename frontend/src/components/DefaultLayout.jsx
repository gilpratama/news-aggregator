import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import { useState } from "react";
import '../News.css';

export default function DefaultLayout() {
  const { user, token, setUser, setToken, notification } = useStateContext();
  const [darkMode, setDarkMode] = useState(0);
  const [fontSize, setFontSize] = useState(0);

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
      setDarkMode(data.dark_mode);
      setFontSize(data.font_size);
    });
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div id="defaultLayout">
      <div className="content" id={darkMode == 1 ? "dark-content" : "content"}>
        <header>
          <a href={"/"} className="btn-home">
            News Aggregator
          </a>
          <div className="header-component">
            {/* {user.name} &nbsp; &nbsp; */}
            <a className="btn" href={"/users/" + user.id}>
              {user.name}
            </a>{" "}
            &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">
              Logout
            </a>
          </div>
        </header>
        <main id={fontSize == 1 ? "small-font" : fontSize == 2 ? "big-font" : "content"}>
          <Outlet />
        </main>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
}
