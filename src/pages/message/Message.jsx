import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Message.scss";

const Message = () => {
  const [user, setUser] = useState(null);
  const [send, setSend] = useState("");
  const [profile, setProfile] = useState(null);
  const { id } = useParams();
  const api = "http://localhost:3002/users-chat";

  useEffect(() => {
    const onFetch = async () => {
      await fetch(api)
        .then((response) => response.json())
        .then((res) =>
          res.map((item) => {
            if (item?.id === id) {
              setUser(item);
            }
          })
        );
    };
    onFetch();
    setProfile(sessionStorage.getItem("profile", profile));
  }, [id]);

  const handleChange = (e) => {
    setSend(e.target.value);
  };

  const handleSend = () => {
    setUser({
      id: user?.id,
      photo: user?.photo,
      name: user?.name,
      phone: user?.phone,
      last: user?.last,
      state: user?.state,
      sendM: user?.sendM.concat(send),
      receM: user?.receM,
      bio: user?.bio,
    });
  };

  const handleSendKey = (e) => {
    if (e.key === "Enter") {
      setUser({
        id: user?.id,
        photo: user?.photo,
        name: user?.name,
        phone: user?.phone,
        last: user?.last,
        state: user?.state,
        sendM: user?.sendM.concat(send),
        receM: user?.receM,
        bio: user?.bio,
      });
    }
  };

  const navigate = useNavigate();

  const handleOut = () => {
    navigate("/users");
  };

  const handleClear = () => {
    setSend("");
  };

  return (
    <div className="message">
      <div className="message--container">
        <div className="message--container--head">
          <div className="message--container--head--div">
            <img
              src={user?.photo}
              alt="no photo"
              className="message--container--head--div--photo"
            />

            <span className="message--container--head--div--name">
              {user?.name}
            </span>
          </div>
          <div className="message--container--head--div">
            <i
              onClick={handleOut}
              className="bx bx-log-out message--container--head--div--icon"
            ></i>
          </div>
        </div>
        <div className="message--container--body">
          <div className="message--container--body--messages">
            <div className="message--container--body--messages--sendMessage">
              {user?.sendM.map((item, index) => (
                <span
                  key={index}
                  className="message--container--body--messages--sendMessage--span"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="message--container--body--messages--recevMessage">
              {user?.receM.map((item, index) => (
                <span
                  key={index}
                  className="message--container--body--messages--recevMessage--span"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="message--container--add">
          <img
            src={profile}
            alt="no photo"
            className="message--container--add--photo"
          />
          <div className="message--container--add--inputs">
            <input
              value={send}
              onChange={handleChange}
              onKeyDown={handleSendKey}
              type="text"
              className="message--container--add--inputs--input"
              placeholder="Write Message"
            />
            {send !== "" ? (
              <i
                onClick={handleClear}
                class="bx bx-x message--container--add--inputs--icon"
              ></i>
            ) : (
              ""
            )}
          </div>

          <i
            onClick={handleSend}
            className="bx bxs-chevron-right-circle message--container--add--icon"
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Message;
