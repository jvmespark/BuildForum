
// front main page which displays all the recent posts

import Wall from '../components/Wall'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <div>
        <NavBar/>
        <Wall/>
    </div>
  );
}
export default Home;