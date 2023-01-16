import "./App.css";
import Header from "./compoents/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Post from "./pages/Post";
import Category from "./pages/Category";

function App() {
  return (
    <>
      <div className="bg-teal-50">
        <BrowserRouter>
          <Header className="h-screen overflow-y-scroll bg-teal-50" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:slug" element={<Post />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
