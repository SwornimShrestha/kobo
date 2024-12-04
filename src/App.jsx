import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import ApiConfigurationForm from "./pages/ApiConfigurationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiConfigurationForm />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
