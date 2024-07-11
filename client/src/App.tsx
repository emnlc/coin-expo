import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Home from "./pages/Home";
import Coin from "./pages/Coin";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:coin" element={<Coin />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
