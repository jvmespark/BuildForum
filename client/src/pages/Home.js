

// front main page which displays all the recent posts

// wall, header with profile, create post, etc.
// how to redirect posts to their own link? slug routing probably

// pass in data

import React, {useState, useEffect} from 'react';
import Wall from './../components/Wall'

function Home() {
  // abstract this to pages FrontPage
  // posts[0].title works
  return (
    <div>
      <form action="/Submit">
        <input type="submit" value="Create Post" />
      </form>
      <Wall/>
    </div>
  );
}
export default Home;