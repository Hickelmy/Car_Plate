import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import PlatesHistory from "./pages/PlatesHistory/PlatesHistory";
import PlatesRegister from "./pages/PlateRegister/PlatesRegister";
import Capture from "./pages/Capture/capture";
import Recognize from "./pages/Reconize/reconize";
import UserGrid from "./pages/UserGrid/users";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<PlatesRegister />} />
          <Route path="/history" element={<PlatesHistory />} />

          <Route path="/capture" element={<Capture />} />
          <Route path="/users" element={<UserGrid />} />
          <Route path="/recognize" element={<Recognize />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
