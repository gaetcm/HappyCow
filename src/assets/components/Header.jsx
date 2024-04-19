import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ setVisible, visible }) => {
  return (
    <header>
      <div>
        <p>Header</p>
      </div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Afficher/Masquer Modal
      </button>
    </header>
  );
};

export default Header;
