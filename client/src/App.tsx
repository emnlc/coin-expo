import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Coin from "./pages/Coin";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  useQuery({
    queryKey: ["coins"],
    queryFn: () => {
      const d = fetch(`${import.meta.env.VITE_COINEXPO_SERVER_URL}/coins`).then(
        (res) => res.json()
      );
      return d;
    },
    staleTime: 5 * 60 * 1000,
  });

  // console.log(data);

  return (
    <Router>
      <DarkModeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/crypto/:coin" element={<Coin />} />
        </Routes>
        <Footer />
      </DarkModeProvider>
    </Router>
  );
}

export default App;
