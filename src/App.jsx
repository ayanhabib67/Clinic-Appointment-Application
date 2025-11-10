import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./loginPage";
import AuthRoute from "./Routes/AuthRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Dashboard from "./adminPanel/pages/adminDashboard";
import ClinicLandingPage from "./landingPage/ClinicLandingPage";
import SignUpPage from "./singUpPage";
import StaffDashboard from "./staffPanel/pages/staffDashboard";
import AllDoctorsPage from "./userPanel/userDocter";
import PatientDashboard from "./userPanel";
import AppointmentPage from "./userPanel/appoiment";


function App() {
  return (
    <BrowserRouter>
  
<Routes>
  <Route element={<AuthRoute />}>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signUp" element={<SignUpPage />} />
  </Route>

  <Route index element={<ClinicLandingPage />} />
  <Route path="/AllDoctorsPage" element={<AllDoctorsPage />} />

  <Route element={<PrivateRoute allowedRoles={['admin']} />}>
    <Route path="/adminDashboard" element={<Dashboard />} />
  </Route>

  <Route element={<PrivateRoute allowedRoles={['staff']} />}>
    <Route path="/StaffDashboard" element={<StaffDashboard />} />
  </Route>

  <Route element={<PrivateRoute allowedRoles={['patient']} />}>
    <Route path="/PatientDashboard" element={<PatientDashboard />} />
    <Route path="/AppointmentPage/:id" element={<AppointmentPage />} />
  </Route>
</Routes>

    </BrowserRouter>
  );
}

export default App;
