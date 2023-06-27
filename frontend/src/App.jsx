import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import StreamerPage from "./pages/StreamerPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/streamer/:id" element={<StreamerPage />} />
    </Routes>
  );
}

export default App;
