import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon
            icon={faStar}
            style={{
              color: "white",
              borderColor: "#FFC200",
              borderWidth: "2px",
              borderStyle: "inherit",
            }}
          />
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
      <form>
        <label htmlFor="search"></label>
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
      {data.map((restaurant, index) => (
        <div key={index}>
          <div
            style={{
              backgroundImage: `url(${restaurant.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100px",
              height: "100px",
            }}
          ></div>
          <Link
            to={`/restaurants/${restaurant.placeId}`}
            key={restaurant.placeId}
          >
            <div>{restaurant.name}</div>
          </Link>
          <div>{restaurant.address}</div>
          <div>{ratingStars(restaurant.rating)}</div>
          <div>{restaurant.description}</div>
        </div>
      ))}
    </>
  );
};

export default Home;
