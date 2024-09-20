

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Routes } from "react-router-dom";
import Loginpage from "./components/Login-page";
import Homepage from "./components/Home-page";
import { UserProvider } from "./user-context/User-context";
import UpdateTodo from "./components/UpdateTodo";

const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/update/:id" element={<UpdateTodo />} />
            <Route path="/login" element={<Loginpage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
};

export default App;
