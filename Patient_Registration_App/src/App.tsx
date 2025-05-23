import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginRegister from "./components/LoginRegister";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import QueryInterface from "./components/QueryInterface";
import { verifyToken } from "./auth";

const ProtectedLayout: React.FC = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = verifyToken(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<LoginRegister />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/register-patient" element={<PatientForm />} />
            <Route path="/patient-list" element={<PatientList />} />
            <Route path="/query" element={<QueryInterface />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
