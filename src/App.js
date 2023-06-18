import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Archieve } from "./pages/Archieve";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          top: "3rem",
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archieves" element={<Archieve />} />
      </Routes>
    </div>
  );
}

export default App;
