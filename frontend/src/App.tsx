import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MaintenanceRequestPage from "./pages/MaintenanceRequestPage";
import NewMaintenanceRequest from "./pages/NewMaintenanceRequest";
import NotFound from "./components/NotFound";
import PrivateRoutes from "./utils/PrivateRoutes";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/request/new" element={<NewMaintenanceRequest />} />
          <Route path="/request" element={<MaintenanceRequestPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
