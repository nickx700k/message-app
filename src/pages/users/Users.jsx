import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.scss";
import { SearchTerm } from "../../components/header/Header";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const api = "http://localhost:3002/users-chat";
  const [users, setUsers] = useState([]);
  const { search } = useContext(SearchTerm);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      await fetch(api)
        .then((response) => response.json())
        .then((res) => setUsers(res));
    };
    fetchUsers();
    setLoading(false);
  }, []);

  const handleProfile = (e) => {
    const id = e.target.id;
    navigate(`/profile/${id}`);
  };

  useEffect(() => {
    const resultUsers = users.filter((item) => {
      if (search !== "") {
        return item?.name?.toLowerCase()?.includes(search?.toLowerCase());
      } else if (search === "") {
        return users;
      }
    });
    setUsers(resultUsers);
  }, [search]);

  const handleMessage = (e) => {
    const id = e.target.id;
    navigate(`/message/${id}`);
  };

  return (
    <div className="users">
      <div className="users--container">
        <h1 className="page-title">Users</h1>
        <div className="users--container--table">
          {loading ? (
            <h2 className="loading">Loading...</h2>
          ) : (
            <>
              {users &&
                users.map((item) => (
                  <div
                    key={item?.id}
                    id={item?.id}
                    className="users--container--table--user"
                  >
                    <div
                      id={item?.id}
                      onClick={handleMessage}
                      className="users--container--table--user--click"
                    ></div>
                    <div className="users--container--table--user--profile">
                      <img
                        id={item?.id}
                        onClick={handleProfile}
                        src={item?.photo}
                        alt="D"
                        className="users--container--table--user--profile--photo"
                      />
                      <div
                        style={{
                          backgroundColor:
                            item?.state === "online" ? "green" : "red",
                        }}
                        className="users--container--table--user--profile--state"
                      ></div>
                    </div>

                    <div className="users--container--table--user--info">
                      <h4 className="users--container--table--user--info--name">
                        {item?.name}
                      </h4>
                      {item?.state === "online" ? (
                        <span className="users--container--table--user--info--online">
                          Online
                        </span>
                      ) : (
                        <span className="users--container--table--user--info--last ">
                          last message in: {item?.last}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
