import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../img/happycow-logo.svg";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({ setVisible, visible }) => {
  return (
    <header>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon
          id="burger"
          icon={faBars}
          fontSize={20}
          style={{ marginRight: "10px", marginLeft: "15px" }}
        />
        <Link to={"/"}>
          <img id="logo" src={logo} width={180} />
        </Link>
      </div>
      <button
        style={{
          backgroundColor: "#7C4EC4",
          width: "120px",
          height: "48px",
          borderRadius: "15px",
          border: "none",
          marginRight: "15px",
          color: "white",
          fontSize: "18px",
        }}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Login / Join
      </button>
    </header>
  );
};

export default Header;
