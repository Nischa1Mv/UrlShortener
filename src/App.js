import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Redirect from "./Redirect";
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" component={Home} exact />
            <Route path="/:srtLink" component={Redirect} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
