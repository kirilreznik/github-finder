import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col justify-between h-screen">
              <Navbar />
              <main>Content</main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
