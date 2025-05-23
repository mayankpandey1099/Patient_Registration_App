import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/LoginRegister";
import PatientForm from "./components/PatientForm";
import PatientList from "./components/PatientList";
import QueryInterface from "./components/QueryInterface";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/register-patient" element={<PatientForm />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="/query" element={<QueryInterface />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
