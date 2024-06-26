import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//page/components :
import Header from "./assets/components/Header.jsx";
import Footer from "./assets/components/Footer.jsx";
import Modal from "./assets/components/Modal.jsx";
import Home from "./assets/pages/Home.jsx";
import NotFound from "./assets/pages/Notfound.jsx";
import Restaurants from "./assets/pages/Restaurants.jsx";
import Carte from "./assets/pages/Carte.jsx";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <Router>
      <Header setVisible={setVisible} visible={visible} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:id" element={<Restaurants />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      {visible && <Modal setVisible={setVisible} visible={visible} />}
    </Router>
  );
}

export default App;
