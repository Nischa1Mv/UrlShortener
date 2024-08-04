import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Redirect from "./Redirect";
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/:srtlink" element={<Redirect />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
