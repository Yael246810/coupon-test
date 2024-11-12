import "./App.css";
import Footer from "./components/Layout/Footer/Footer";
import Header from "./components/Layout/Header/Header";
import Home from "./components/Pages/Home/Home";
import Menu from "./components/Layout/Menu/Menu";
import Main from "./components/Layout/Main/Main";
import { useState } from "react";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Home /> */}
      <Menu />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
