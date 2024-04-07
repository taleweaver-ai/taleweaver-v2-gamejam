import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/page"
import CreatorPage from "./pages/creator/page";
import WorldPage from "./pages/world/page";
import PlayPage from "./pages/world/play/page";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatorPage />} />
        <Route path="/world/:worldId" element={<WorldPage />} />
        <Route path="/world/:worldId/play/:threadId/:runId" element={<PlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
