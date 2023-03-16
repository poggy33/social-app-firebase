import React from "react";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./pages/main/Main";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { CreatePost } from "./pages/create-post/CreatePost";
import { Footer } from "./components/Footer";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles"; 

const StyledMainBox = styled(Box)(() => ({
  backgroundImage: `linear-gradient(
    95deg,
    hsl(240deg 6% 93%) 9%,
    hsl(264deg 14% 93%) 37%,
    hsl(282deg 26% 93%) 47%,
    hsl(296deg 37% 93%) 53%,
    hsl(317deg 45% 92%) 58%,
    hsl(338deg 55% 92%) 62%,
    hsl(356deg 66% 92%) 66%,
    hsl(15deg 76% 92%) 70%,
    hsl(34deg 86% 92%) 77%,
    hsl(54deg 95% 91%) 94%
      );`,
}));

function App() {
  return (
    <StyledMainBox sx={{backgroundColor:"lightgray"}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      </StyledMainBox>
  );
}

export default App;
