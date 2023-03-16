import React, { useContext } from "react";
import Home from "../pages/home/Home.jsx";
import Login from "../pages/login/Login.jsx";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Rooms from "../pages/room/Rooms";
import Users from "../pages/users/Users";
import Profile from "../pages/profie/Profile";
import Account from "../pages/profie/Account";
import Message from "../pages/message/Message";
import { Route, Routes, useLocation } from "react-router-dom";

export default function Rooters() {
  const [user, setUser] = useState(null);
  const [path, setPath] = useState("");
  const loc = useLocation();
  useEffect(() => {
    setUser(sessionStorage.getItem("username", user));
    setPath(loc.pathname);
  });
  return (
    <>
      {!user ? (
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      ) : (
        <>
          {path.includes("/profile") ? (
            <Routes>
              <Route path="/profile/:id" element={<Profile />} />
            </Routes>
          ) : path.includes("/account") ? (
            <Routes>
              <Route path="/account/:id" element={<Account />} />
            </Routes>
          ) : path.includes("/message") ? (
            <Routes>
              <Route path="/message/:id" element={<Message />} />
            </Routes>
          ) : (
            <Header>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/room" element={<Rooms />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </Header>
          )}
        </>
      )}
    </>
  );
}
