import React, { createContext, useEffect, useState } from "react";
import "./Header.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal } from "antd";

export const SearchTerm = createContext({
  search: "",
  handleSearch: () => {},
});

export default function Header({ children }) {
  const [id, setId] = useState("");
  const [profile, setProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setId(sessionStorage.getItem("username", id));
    setProfile(sessionStorage.getItem("profile", profile));
  }, [id]);

  const handleEdit = () => {
    navigate(`/account/${id}`);
  };

  return (
    <>
      <div className="header">
        <Modal
          title="Log Out"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Do you want logout???</p>
        </Modal>
        <div className="header--container">
          <div className="header--container--div-1">
            <div className="header--container--div-1--profile-1">
              <img
                src={profile}
                alt="profile photo"
                className="header--container--div-1--profile-1--image"
              />
              <h2 className="header--container--div-1--profile-1--username">
                {id ? id : "User Name"}
              </h2>
            </div>
            <div className="header--container--div-1--profile-2">
              <i
                onClick={handleEdit}
                className="bx bx-edit-alt header--container--div-1--profile-2--icon"
              ></i>
              <i
                onClick={showModal}
                className="bx bx-log-out header--container--div-1--profile-2--icon"
              ></i>
            </div>
          </div>
          <div className="header--container--div-2">
            <i className="bx bx-search header--container--div-2--icon"></i>
            <input
              value={search}
              onChange={handleSearch}
              type="text"
              className="header--container--div-2--input"
              placeholder="Search Here..."
            />
          </div>
          <div className="header--container--div-3">
            <div
              onClick={() => navigate("/")}
              className={`header--container--div-3--icons ${
                location === "/" ? "active" : ""
              }`}
            >
              <i className="bx bxs-home-alt-2 header--container--div-3--icons--icon"></i>
            </div>
            <div
              onClick={() => navigate("/room")}
              className={`header--container--div-3--icons ${
                location === "/room" ? "active" : ""
              }`}
            >
              <i className="bx bxs-message-detail header--container--div-3--icons--icon"></i>
            </div>
            <div
              onClick={() => navigate("/users")}
              className={`header--container--div-3--icons ${
                location === "/users" ? "active" : ""
              }`}
            >
              <i className="bx bxs-user-account header--container--div-3--icons--icon"></i>
            </div>
          </div>
        </div>
      </div>
      <>
        <SearchTerm.Provider value={{ search, handleSearch }}>
          {children}
        </SearchTerm.Provider>
      </>
    </>
  );
}
