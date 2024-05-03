import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Modal = ({ setVisible }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrormessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrormessage("");
      const response = await axios.post("http://localhost:3000/", {
        username: username,
        email: email,
        password: password,
        newsletter: newsletter,
      });
      console.log("===> la réponse", response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error.response.status);
      if (error.response.status === 409) {
        setErrormessage("This email already has an account");
      } else if (error.response.data.message === "Missing parameters") {
        setErrormessage("Please fill in all the fields");
      }
    }
  };

  return (
    <div className="modal-root">
      <div
        style={{
          backgroundColor: "white",
          width: "400px",
          height: "50px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          className="X"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setVisible(false);
          }}
        >
          X
        </button>
      </div>
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="formulaire">
          <form
            className="formsignup"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="inputtext"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <input
                value={username}
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                value={email}
                type="email"
                name="email"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                value={password}
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button
              style={{ margin: "40px" }}
              type="submit"
              value="S'inscrire'"
            >
              S'inscrire
            </button>
            {errorMessage && <p style={{ color: "red" }}> {errorMessage}</p>}
          </form>
          <Link
            style={{ color: "black", fontSize: "15px", fontWeight: "400" }}
            to="/login"
          >
            Tu as déjà un compte ? connecte-toi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Modal;
