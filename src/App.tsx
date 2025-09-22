import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import News from "./screens/News";
import Categories from "./screens/Categories";
import NavBar from "./components/NavBar";

function App() {
    // Kategorie-State
    const [selectedCategory, setSelectedCategory] = useState<string>("general");
    const navigate = useNavigate();

    // Handler für Kategorie-Wechsel in News
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    // Handler für Kategorie-Auswahl in Categories
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    // Handler für Navigation (z.B. von Categories zu News)
    const handleNavigate = (tab: string) => {
        if (tab === "news") navigate("/news");
        if (tab === "categories") navigate("/categories");
    };

    return (
        <>
            <NavBar />
            <Routes>
                <Route
                    path="/news"
                    element={
                        <News
                            selectedCategory={selectedCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                    }
                />
                <Route
                    path="/categories"
                    element={
                        <Categories
                            onCategorySelect={handleCategorySelect}
                            onNavigate={handleNavigate}
                        />
                    }
                />
                <Route
                    path="*"
                    element={
                        <News
                            selectedCategory={selectedCategory}
                            onCategoryChange={handleCategoryChange}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
