import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Account.scss";

const UserProfile = () => {
  const [account, setAccount] = useState(null);
  const api =
    "https://api.jsonstorage.net/v1/json/03537e04-0bc5-47aa-a096-990b9631e38e/f34feb7e-e606-419e-88a8-0d1baba93bed";
  const { id } = useParams();
  useEffect(() => {
    const handleAccount = async () => {
      await fetch(api)
        .then((response) => response.json())
        .then((res) =>
          res?.users.map((item) => {
            if (item?.id === id) {
              setAccount(item);
            }
          })
        );
    };
    handleAccount();
    console.log(account, "account");
  }, [id]);

  const navigate = useNavigate();

  const handleOut = () => {
    navigate("/");
  };

  return (
    <div className="account">
      <div className="account--container">
        <i
          onClick={handleOut}
          className="bx bx-log-out account--container--out"
        ></i>
        <div className="account--container--head">
          <img
            src={account?.profile}
            alt="Photo"
            className="account--container--head--photo"
          />
          <h1 className="account--container--head--username">{account?.id}</h1>
        </div>
        <div className="account--container--info">
          <div className="account--container--info--email">
            <h4 className="account--container--info--email--h4">Gmail</h4>
            <label
              className="account--container--info--email--label"
              htmlFor="label"
            >
              {account?.email}
            </label>
          </div>
          <div className="account--container--info--bio">
            <h4 className="account--container--info--bio--h4">Bio</h4>
            <p className="account--container--info--bio--p">{account?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
