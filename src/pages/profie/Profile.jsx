import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const api = "http://localhost:3002/users-chat";
  const navigate = useNavigate();

  useEffect(() => {
    const findProfile = async () => {
      await fetch(api)
        .then((response) => response.json())
        .then((res) => {
          return res.find((item) => {
            if (item?.id === id) {
              setProfile(item);
            }
          });
        });
    };
    findProfile();
  }, [id]);

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="profile">
      <i onClick={handleExit} className="bx bx-log-out profile--exit"></i>
      <div className="profile--container">
        <div className="profile--container--head">
          <img
            src={profile?.photo}
            alt="P"
            className="profile--container--head--photo"
          />
          <h1 className="profile--container--head--name">{profile?.name}</h1>
        </div>
        <div className="profile--container--info">
          <div className="profile--container--info--contact">
            <h1 className="profile--container--info--contact--phone-h1">
              Phone
            </h1>
            <h1 className="profile--container--info--contact--number">
              {profile?.phone}
            </h1>
          </div>

          <div className="profile--container--info--contact">
            <h1 className="profile--container--info--contact--bio-h1">Bio</h1>
            <p className="profile--container--info--contact--bio">
              {profile?.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
