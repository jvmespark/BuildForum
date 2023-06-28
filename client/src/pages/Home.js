

// front main page which displays all the recent posts

import Wall from './../components/Wall'
import './styles/Home.css'

function Logout() {
    localStorage.removeItem("username")
}

function Home() {
  let username = localStorage.getItem("username")

  return (
    <div>
        <div className="header">
            <form action="/submit" className="headerForm">
                <input type="submit" value="Create Post" />
            </form>
            { username ?
                (
                    <div className='header'>
                        <form action="/profile" className="headerForm">
                            <input type="submit" value={username} />
                        </form>
                        <form action="/messages" className="headerForm">
                            <input type="submit" value="Chat" />
                        </form>
                        <form onSubmit={Logout} className="headerForm">
                            <input type="submit" value="Logout" />
                        </form>
                    </div>
                )
                :
                (
                    <div className='header'>
                        <form action="/login" className='headerForm'>
                            <input type="submit" value="Login" />
                        </form>
                    </div>
                )
            }
            <Wall/>
        </div>
    </div>
  );
}
export default Home;