import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Home from "./pages/Home";

function App() {
  useQuery({
    queryKey: ["todo"],
    queryFn: () => {
      const d = fetch("https://jsonplaceholder.typicode.com/todos").then(
        (res) => res.json()
      );
      return d;
    },
  });

  // console.log(data);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
