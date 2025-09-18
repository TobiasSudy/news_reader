import "./App.css";
import {Routes, Route } from "react-router-dom";
import News from "./screens/News";
import Categories from "./screens/Categories";
import NavBar from "./components/NavBar";

function App() {


    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/news" element={<News />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="*" element={<News />} />
            </Routes>
        </>


    );
}

export default App;
