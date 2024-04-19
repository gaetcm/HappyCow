import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";

//page/components :
import Header from "./assets/components/Header.jsx";
import Footer from "./assets/components/Footer.jsx";
import Modal from "./assets/components/Modal.jsx";
import Home from "./assets/pages/Home.jsx";
import NotFound from "./assets/pages/Notfound.jsx";
import Restaurant from "./assets/pages/restaurant.jsx";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <Router>
      <Header setVisible={setVisible} visible={visible} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      visible && <Modal setVisible={setVisible} />
    </Router>
  );
}

export default App;
