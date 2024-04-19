import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <div>
        <div>
          <p>404 : PAGE NOT FOUND</p>
          <Link to="/">Retour à la page d'accueil</Link>
        </div>
      </div>
    </main>
  );
};
export default NotFound;
