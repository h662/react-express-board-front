import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import LogIn from "./pages/log-in";
import Detail from "./pages/detail";
import SignUp from "./pages/sign-up";
import Create from "./pages/create";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:postId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
