import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NewMaintenanceRequest from "./pages/NewMaintenanceRequest";

import PrivateRoutes from "./utils/PrivateRoutes";
import "./styles/App.css";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
            <Route path="/request/new" element={<NewMaintenanceRequest />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
