
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewMaintenanceRequest from "./NewMaintenanceRequest";

import PrivateRoutes from "./utils/PrivateRoutes";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/new-maintenance-request"
            element={<NewMaintenanceRequest />}
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
