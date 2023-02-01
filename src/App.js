import Home from "./PAGES/Home";
import LogIn from "./PAGES/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {

  const userData = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {userData.userEmail === "" ? (
            <Route path="/" element={<LogIn />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/room/:roomId" element={<Home />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
