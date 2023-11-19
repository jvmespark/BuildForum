import './NavBar.css'

import React, { useState, useEffect } from 'react';
import { TextField, Button } from "@mui/material";
import Modal from '@mui/material/Modal';

//<Button variant="contained" className="headerFormR" href="/messages" disableElevation sx={{ mr: 2 }}> Chat </Button>

interface User {
    username: string;
    password: string;
}

function NavBar() {
    let username = localStorage.getItem("username")
    let collegeName = "RPI";

    const [allUsernames, setAllUsernames] = useState<User[]>([]);

    useEffect(() => {
        getUsernames()
    }, []);

    const getUsernames = async () => {
        try {
            const response = await fetch('http://localhost:3001/users');
            const json = await response.json()
            setAllUsernames(json)
        } catch (err) {
            console.log(err)
        }
    }

    function checkUserExists(username: string): number {
        // go through username array 
        if (allUsernames.length === 0) {
            return -1;
        }
        for (let i = 0; i < allUsernames.length; i++) {
            if (allUsernames[i].username === username) {
                return i;
            }
        }
        return -1;
    }

    function LoginForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries()) as { username: string, password: string };

        let username = formJson.username
        let password = formJson.password
        let loggedIn = false

        if (username && password) {
            // check if the username exists and check the password
            let userExists = checkUserExists(username)
            if (userExists !== -1) {
                // check the password
                if (allUsernames[userExists].password === password) {
                    // login, set to cache data
                    loggedIn = true
                }
                else {
                    alert("incorrect login info")
                }
            }
            else {
                //if not create the new user
                fetch('http://localhost:3001/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                })
                loggedIn = true;
            }
        }

        if (loggedIn) {
            localStorage.setItem("username", username);
            window.location.replace(document.referrer);
        }

        (document.getElementById('username') as HTMLInputElement).value='';
        (document.getElementById('password') as HTMLInputElement).value='';
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="header">
            <a href={'/'} className='headerLogo'> Campus Brag: {collegeName}</a>
            { username ?
                (
                    <div>

                        <div className="headerUser">
                            <Button variant="contained" href={'/profile/'+ username} disableElevation > {username} </Button>
                        </div>
                        
                        <Button variant="contained" className="headerFormR" href="/submit" disableElevation sx={{ mr: 2 }}> Create Post </Button>
                    
                        <div className="App">
                        </div>
                    </div>
                )
                :
                (
                    <div className="headerFormR">
                        <Button variant="contained" disableElevation onClick={handleOpen}>Login</Button>
                            <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <div className="loginBox">
                                <form onSubmit={LoginForm}>
                                    <TextField name="username" id="username" type="text" label="Username" variant="standard" />
                                    <br></br>
                                    <TextField name="password" id="password" type="text" label="Password" variant="standard" />
                                    <br></br>
                                    <Button variant="contained" type="submit" disableElevation sx={{ marginTop: 5 }}>Login</Button>
                                </form>
                            </div>
                        </Modal>
                    </div>
                )
            }
        </div>
    );
}

export default NavBar;