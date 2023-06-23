

// front main page which displays all the recent posts

// wall, header with profile, create post, etc.
// how to redirect posts to their own link? slug routing probably

// pass in data

import Wall from './../components/Wall'

function Home() {
  // abstract this to pages FrontPage
  // posts[0].title works
  let loggedIn = false

  return (
    <div>
        <form action="/submit">
        <input type="submit" value="Create Post" />
        </form>
        { loggedIn ?
            (
                <div>
                    <form action="/profile">
                        <input type="submit" value="Profile Name" />
                    </form>
                    <form action="/messages">
                        <input type="submit" value="Chat" />
                    </form>
                </div>
            )
            :
            (
            <form action="/login">
                <input type="submit" value="Login" />
            </form>
            )
        }
      <Wall/>
    </div>
  );
}
export default Home;