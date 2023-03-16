import React, { useContext, useEffect, useState } from "react";
import "./Rooms.scss";
import { SearchTerm } from "../../components/header/Header";

const Rooms = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = "http://localhost:3003/chatrooms";
  const { search } = useContext(SearchTerm);

  useEffect(() => {
    setLoading(true);
    const fetchChatRooms = async () => {
      await fetch(api)
        .then((response) => response.json())
        .then((res) => setChatRooms(res));
    };
    fetchChatRooms();
    setLoading(false);
  }, []);

  useEffect(() => {
    const resultChat = chatRooms.filter((item) => {
      if (search !== "") {
        return item?.chatTitle?.toLowerCase()?.includes(search?.toLowerCase());
      } else if (search === "") {
        return chatRooms;
      }
    });
    setChatRooms(resultChat);
  }, [search]);

  return (
    <div className="rooms">
      <div className="rooms--container">
        <h1 className="page-title">Rooms</h1>
        <div className="rooms--container--table">
          {loading ? (
            <h2 className="loading">Loading...</h2>
          ) : (
            <>
              {chatRooms &&
                chatRooms.map((item) => (
                  <div key={item?.id} className="rooms--container--table--room">
                    <div className="rooms--container--table--room--header">
                      <i
                        className={`${item?.chatIcon} rooms--container--table--room--header--icon`}
                      ></i>
                    </div>
                    <div className="rooms--container--table--room--info">
                      <h4 className="rooms--container--table--room--info--h4">
                        {item?.chatTitle}
                      </h4>
                      {item?.chatMessage === [] ? (
                        <span className="rooms--container--table--room--info--span">
                          No message
                        </span>
                      ) : (
                        <span className="rooms--container--table--room--info--span">
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

export default Rooms;
