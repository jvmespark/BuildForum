
import {React, useState, useEffect} from 'react';
import './styles/Login.css';

// login page
function Login() {
    const [allUsernames, setAllUsernames] = useState([]);

    useEffect(()=>{
        getUsernames()
    },[]);

    const getUsernames=async()=> {
        try {
            const response = await fetch('http://localhost:3001/users');
            const json = await response.json()
            setAllUsernames(json)
        } catch(err) {
            console.log(err)
        }
    }

    function checkUserExists(username) {
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

    function LoginForm(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

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
                    body: JSON.stringify({username, password}),
                })
                loggedIn = true;
            }
        }

        if (loggedIn) {
            // store username in localstorage
            localStorage.setItem("username", username);
        }

        document.getElementById('username').value = ''
        document.getElementById('password').value = ''

        window.location.replace(document.referrer);
    }

    return (
        <div>
            <form action="/">
                <input type="submit" value="Home" />
            </form>
            <div className="loginBox">
                <form onSubmit={LoginForm}>
                        <label>
                            Username: <br></br>
                            <input type="text" name="username" id="username"/>
                        </label>
                        <br></br>
                        <label>
                            Password: <br></br>
                            <input type="text" name="password" id="password"/>
                        </label>
                        <br></br>
                        <input type="submit" value="Login" />
                    </form>
            </div>
        </div>
    );
}

export default Login;