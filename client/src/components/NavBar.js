import React from 'react';
import './NavBar.css'
import Button from '@mui/material/Button';

function Logout() {
    localStorage.removeItem("username")
}

function NavBar() {
    const theme = {
        spacing: 8,
      }

    let username = localStorage.getItem("username")
    return (
        <div className="header">
            <Button variant="contained" className="headerFormL" href="/" disableElevation>Build Forum</Button>
            { username ?
                (
                    <div>
                        <Button variant="contained" className="headerFormR" href={'/profile/'+ username} disableElevation > {username} </Button>
                        <form onSubmit={Logout}>
                            <Button variant="contained" className="headerFormR" type="submit" disableElevation sx={{ mr: 2 }}> Log Out </Button>
                        </form>
                        <Button variant="contained" className="headerFormR" href="/messages" disableElevation sx={{ mr: 2 }}> Chat </Button>
                        <Button variant="contained" className="headerFormR" href="/submit" disableElevation sx={{ mr: 2 }}> Create Post </Button>
                    </div>
                )
                :
                (
                    <div>
                        <Button variant="contained" className="headerFormR" href="/login" disableElevation> Login </Button>
                        <Button variant="contained" className="headerFormR" href="/submit" disableElevation sx={{ mr: 2 }}> Create Post </Button>
                    </div>
                )
            }
        </div>
    );
}

export default NavBar;