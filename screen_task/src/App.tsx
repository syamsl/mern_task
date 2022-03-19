import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Screen1 from "./features/screen/Screen1";
import Registration from "./pages/screen/Registration";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
