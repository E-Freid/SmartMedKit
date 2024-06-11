import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from "./pages/User/HomePage";
import AdminRoutes from "./components/Admin/AdminRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
