import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import PlatesRegister from "./pages/PlatesRegister";
import PlatesHistory from "./pages/PlatesHistory";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<PlatesRegister />} />
          <Route path="/history" element={<PlatesHistory />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
