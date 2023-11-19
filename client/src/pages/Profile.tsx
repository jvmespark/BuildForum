/*
    Currently only works for: Usopp, James
    TODO I need to make a page where u can edit your own profile page
*/


import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import './styles/Profile.css';
import Button from '@mui/material/Button';

function Logout() {
    localStorage.removeItem("username");
}


interface Profile {
  photo: string;
  bio: string;
}

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const url = window.location.href;
    const username = url.split(/(?<=^.{30})/)[1];
    setUsername(username);
    getProfileByUsername(username);
  }, []);

  const getProfileByUsername = async (username: string) => {
    if (username !== '') {
      try {
        const response = await fetch(`http://localhost:3001/profiles/get/${username}`);
        const json = await response.json();
        setProfiles(json);
      } catch (err) {
        console.log(err);
      }
    }
  };

  console.log(profiles[0]);

  if (profiles[0]) {
    return (
      <div>
        <NavBar />
        <div className="profile">
          <div className="profile1">
            <div>
              <img className="pic" src={profiles[0].photo} alt="profile picture" />
            </div>
            <div className="bio">
              <h1>{username}</h1>
              <p>{profiles[0].bio}</p>
            </div>
          </div>
            <form onSubmit={Logout}>
                <Button variant="contained" type="submit" color="error" size="small" disableElevation sx={{ mr: 2 }}> Log Out </Button>
            </form>
          <h1>POSTS</h1>
        </div>
      </div>
    );
  }
};

export default Profile;