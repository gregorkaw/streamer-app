import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import StreamerPage from "./pages/StreamerPage";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/streamer/:id" element={<StreamerPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
