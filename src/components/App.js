import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContextComponent } from "../contexts/authContext";

import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div>
      <div className="container mt-5">
        <AuthContextComponent>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
          </Routes>
        </AuthContextComponent>
      </div>
    </div>
  );
}

export default App;
