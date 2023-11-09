import React, { FC, useState, useEffect } from 'react';
import './styles/Login.css';
import { TextField, Button } from "@mui/material";
import NavBar from '../components/NavBar'

interface User {
    username: string;
    password: string;
}

// login page
const Login: FC = () => {
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
            // store username in localstorage
            localStorage.setItem("username", username);
        }

        (document.getElementById('username') as HTMLInputElement).value='';
        (document.getElementById('password') as HTMLInputElement).value='';

        window.location.replace(document.referrer);
    }

    return (
        <div>
            <NavBar />
            <div className="loginBox">
                Login
                <form onSubmit={LoginForm}>
                    <TextField name="username" id="username" type="text" label="Username" variant="standard" />
                    <br></br>
                    <TextField name="password" id="password" type="text" label="Password" variant="standard" />
                    <br></br>
                    <Button variant="contained" type="submit" disableElevation>Login</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;