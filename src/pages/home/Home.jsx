import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { SearchTerm } from "../../components/header/Header";

import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const usersApi = "http://localhost:3002/users-chat";
  const chatRoomApi = "http://localhost:3003/chatrooms";
  const navigate = useNavigate();
  const { search } = useContext(SearchTerm);

  useEffect(() => {
    setLoading(true);
    const fetchAll = async () => {
      await fetch(usersApi)
        .then((response) => response.json())
        .then((res) => setUsers(res));
      await fetch(chatRoomApi)
        .then((response) => response.json())
        .then((res) => setChatRooms(res));
    };
    fetchAll();

    setLoading(false);
  }, []);

  useEffect(() => {
    const resultUsers = users.filter((item) => {
      if (search !== "") {
        return item?.name?.toLowerCase()?.includes(search?.toLowerCase());
      } else if (search === "") {
        return users;
      }
    });
    setUsers(resultUsers);
    const resultChat = chatRooms.filter((item) => {
      if (search !== "") {
        return item?.chatTitle?.toLowerCase()?.includes(search?.toLowerCase());
      } else if (search === "") {
        return chatRooms;
      }
    });
    setChatRooms(resultChat);
  }, [search]);

  const handleProfile = (e) => {
    const id = e.target.id;
    navigate(`/profile/${id}`);
  };

  const handleMessage = (e) => {
    const id = e.target.id;
    navigate(`/message/${id}`);
  };

  return (
    <div className="home">
      <div className="home--container">
        <h1 className="page-title">Chats</h1>

        <div className="home--container--table">
          {loading ? (
            <h2 className="loading">Loading...</h2>
          ) : (
            <>
              {users &&
                users.map((item) => (
                  <div
                    key={item?.id}
                    id={item?.id}
                    className="home--container--table--user"
                  >
                    <div
                      id={item?.id}
                      onClick={handleMessage}
                      className="home--container--table--user--click"
                    ></div>
                    <div className="home--container--table--user--profile">
                      <img
                        id={item?.id}
                        onClick={handleProfile}
                        src={item?.photo}
                        alt="D"
                        className="home--container--table--user--profile--photo"
                      />
                      <div
                        style={{
                          backgroundColor:
                            item?.state === "online" ? "green" : "red",
                        }}
                        className="home--container--table--user--profile--state"
                      ></div>
                    </div>

                    <div className="home--container--table--user--info">
                      <h4 className="home--container--table--user--info--name">
                        {item?.name}
                      </h4>
                      {item?.state === "online" ? (
                        <span className="home--container--table--user--info--online">
                          Online
                        </span>
                      ) : (
                        <span className="home--container--table--user--info--last ">
                          last message in: {item?.last}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              {chatRooms &&
                chatRooms.map((item) => (
                  <div key={item?.id} className="home--container--table--room">
                    <div className="home--container--table--room--header">
                      <i
                        className={`${item?.chatIcon} home--container--table--room--header--icon`}
                      ></i>
                    </div>
                    <div className="home--container--table--room--info">
                      <h4 className="home--container--table--room--info--h4">
                        {item?.chatTitle}
                      </h4>
                      {item?.chatMessage === [] ? (
                        <span className="home--container--table--room--info--span">
                          No message
                        </span>
                      ) : (
                        <span className="home--container--table--room--info--span">
                          {item?.chatMessage.slice(-1)}
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

export default Home;
