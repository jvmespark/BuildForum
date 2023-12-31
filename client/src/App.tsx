import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Messages from "./pages/Messages";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import Post from "./pages/Post"
import NoPage from "./pages/NoPage"
import Profile from "./pages/Profile"

//<Route path="/messages" element={<Messages />} />

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/post/*" element={<Post />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App