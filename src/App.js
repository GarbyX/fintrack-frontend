import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Transactions from "./components/Transactions";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/transactions" element={<Transactions />} />
            </Routes>
        </Router>
    );
}

export default App;
