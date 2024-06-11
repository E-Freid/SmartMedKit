import HomePage from "./pages/User/HomePage";
import AdminHomePage from "./pages/Admin/HomePage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
