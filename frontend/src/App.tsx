import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NewMaintenanceRequest from "./pages/NewMaintenanceRequest";
import NotFound from "./components/NotFound";
import PrivateRoutes from "./utils/PrivateRoutes";
import "./styles/App.css";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes />}>
          <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
            <Route path="/request/new" element={<NewMaintenanceRequest />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
