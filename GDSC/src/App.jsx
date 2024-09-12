import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GDGRegistrationForm from "./regis";
import SuccessPage from "./success";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GDGRegistrationForm />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
