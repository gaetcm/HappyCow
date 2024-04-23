import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import cover from "../img/homecover.webp";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const ratingStars = (star) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < star) {
        stars.push(
          <FontAwesomeIcon icon={faStar} style={{ color: "#FFC200" }} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon icon={faStar} style={{ color: "lightgray" }} />
        );
      }
    }
    return stars;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurants?name=${search}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <div
        style={{
          backgroundImage: `url(${cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "300px",
          backgroundSize: "cover",
          position: "relative",
          zIndex: "10",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          style={{ zIndex: "20", display: "flex", flexDirection: "column" }}
        >
          <label style={{ fontSize: "40px", color: "white" }} htmlFor="search">
            Trouvez un restaurant vegan autour de vous
          </label>

          <input
            id="search"
            value={search}
            type="search"
            name="search"
            placeholder="Recherchez un restaurant"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </form>
      </div>
      <main>
        <section>
          <div>
            <h1>Restaurants vegan autour de vous </h1>
            <Link to={"/Carte"}>
              <span>View All</span>
            </Link>
          </div>
          <div className="restos">
            {data.map((restaurant, index) => (
              <div key={index} className="content">
                <div
                  style={{
                    backgroundImage: `url(${restaurant.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "275px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                ></div>
                <Link
                  to={`/restaurants/${restaurant.placeId}`}
                  key={restaurant.placeId}
                >
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    {restaurant.name}
                  </div>
                </Link>
                <div>{restaurant.address}</div>
                <div>{ratingStars(restaurant.rating)}</div>
                <div>{restaurant.description}</div>
              </div>
            ))}
          </div>
        </section>
        <section style={{ backgroundColor: "lightgray" }}>
          <h1>Les meilleurs restaurants à Paris</h1>
          <div className="restos">
            {data.map((restaurant, index) => (
              <div
                key={index}
                className={restaurant.rating === 5 ? "content" : "hide"}
              >
                <div
                  style={{
                    backgroundImage: `url(${restaurant.thumbnail})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "275px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                ></div>
                <Link
                  to={`/restaurants/${restaurant.placeId}`}
                  key={restaurant.placeId}
                >
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    {restaurant.name}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
