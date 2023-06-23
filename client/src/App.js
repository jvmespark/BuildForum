import { BrowserRouter, Routes, Route } from "react-router-dom";
import Messages from "./pages/Messages";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Submit from "./pages/Submit";

//<Route path="*" element={<NoPage />} />

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Submit" element={<Submit />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;