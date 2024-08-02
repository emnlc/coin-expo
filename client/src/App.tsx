// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Coin from "./pages/Coin";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import { UserProvider } from "./context/UserContext"; // Import UserProvider

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <UserProvider> {/* Wrap with UserProvider */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              }
            />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/crypto/:coin" element={<Coin />} />
          </Routes>
          <Footer />
        </UserProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
