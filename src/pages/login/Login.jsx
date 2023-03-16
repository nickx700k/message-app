import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FadeLoader } from "react-spinners";
import "./Login.scss";

const Login = () => {
  const api =
    "https://api.jsonstorage.net/v1/json/03537e04-0bc5-47aa-a096-990b9631e38e/f34feb7e-e606-419e-88a8-0d1baba93bed";
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((res) => setUser(res.users));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    user.map((item) => {
      if (item?.email === data.email && item?.password === data.password) {
        sessionStorage.setItem("username", item?.id);
        sessionStorage.setItem("profile", item?.profile);
        setProfile(item);
      } else {
        toast.warning("Login Has Field", { theme: "dark" });
      }
    });
  };

  return (
    <div className="login">
      {loading ? (
        <div className="login--container">
          <div className="login--container--loading">
            <div className="login--container--loading--div">
              <img
                src={profile?.profile}
                alt="no photo"
                className="login--container--loading--div--profile"
              />
              <h4 className="login--container--loading--div--username">
                {profile?.id}
              </h4>
            </div>

            <div className="login--container--loading--div">
              <span className="login--container--loading--div--spin">
                <FadeLoader color="#000" />
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <ToastContainer />
          <form className="login--container" onSubmit={handleSubmit}>
            <div className="login--container--profile">
              <i className="bx bx-user login--container--profile--icon"></i>
            </div>
            <div className="login--container--inputs">
              <div className="login--container--inputs--div">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="login--container--inputs--div--input"
                />
                <i className="bx bx-user login--container--inputs--div--icon"></i>
              </div>
              <div className="login--container--inputs--div">
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  className="login--container--inputs--div--input"
                />
                <i className="bx bx-lock-alt login--container--inputs--div--icon"></i>
              </div>
            </div>
            <button className="login--container--button">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
