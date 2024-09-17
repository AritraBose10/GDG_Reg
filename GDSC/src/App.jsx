import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GDGRegistrationForm from "./regis";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GDGRegistrationForm />} />
       
      </Routes>
    </Router>
  );
}

export default App;
