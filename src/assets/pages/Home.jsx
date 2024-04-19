import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurants/name=${search}`
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
      <div>
        <input
          className="input1"
          id="search"
          value={search}
          type="search"
          name="search"
          placeholder="Recherchez un restaurant"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        ></input>
      </div>
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
          <div>{restaurant.rating}</div>
          <div>{restaurant.description}</div>
        </div>
      ))}
    </>
  );
};

export default Home;
