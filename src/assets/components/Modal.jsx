import React, { useState } from "react";

function Modal({ setVisible }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Logique de connexion
    } else {
      // Logique d'inscription
    }
  };

  return (
    <div className="modal">
      <button
        onClick={() => {
          setVisible(false);
        }}
      >
        X
      </button>
      <h2>{isLogin ? "Connexion" : "Inscription"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? "Se connecter" : "S'inscrire"}</button>
      </form>
      <p>
        {isLogin ? "Nouveau sur le site ?" : "Déjà un compte ?"}{" "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "S'inscrire" : "Se connecter"}
        </button>
      </p>
    </div>
  );
}

export default Modal;
