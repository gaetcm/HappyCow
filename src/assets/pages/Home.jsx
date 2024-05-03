import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import cover from "../img/homecover.webp";
import vegan from "../img/category_vegan.svg";
import veganopt from "../img/category_veg-friendly.svg";

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const itemsPerPage = 20;

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
          `http://localhost:3000/restaurants?name=${search}&skip=${skip}&limit=${itemsPerPage}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, skip]);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setSkip(skip + itemsPerPage);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    setSkip(skip - itemsPerPage);
  };

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
          style={{
            zIndex: "20",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label
            style={{ fontSize: "35px", color: "white", marginBottom: "20px" }}
            htmlFor="search"
          >
            Trouvez un restaurant vegan autour de vous
          </label>

          <input
            className="homesearch"
            id="search"
            value={search}
            type="search"
            name="search"
            placeholder="  Recherchez un restaurant"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </form>
      </div>
      <main>
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "60%",
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            <h1>Restaurants vegan autour de vous </h1>
            <Link to={"/carte"}>
              <span style={{ fontWeight: "500" }}>View All</span>
            </Link>
          </div>
          <div className="restos" style={{ paddingBottom: "20px" }}>
            {data.map((restaurant, index) => (
              <div key={index} className="content">
                <Link
                  to={`/restaurants/${restaurant.placeId}`}
                  key={restaurant.placeId}
                >
                  <div
                    style={{
                      backgroundImage: `url(${restaurant.thumbnail})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "270px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  ></div>

                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontSize: "15px",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginRight: "2px" }}>
                      {restaurant.vegan === 1 ? (
                        <img src={vegan} style={{ width: "25px" }} />
                      ) : (
                        <img src={veganopt} style={{ width: "25px" }} />
                      )}
                    </div>
                    {restaurant.name}
                  </div>
                </Link>
                <div
                  style={{
                    marginTop: "5px",
                    marginBottom: "10px",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#666666",
                  }}
                >
                  {restaurant.address}
                </div>
                <div>{ratingStars(restaurant.rating)}</div>
                <div
                  className="ellipsis"
                  style={{
                    width: "270px",
                    height: "50px",
                    marginTop: "10px",
                    marginBottom: "5px",
                    fontSize: "13px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {restaurant.description}
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <button
              className="buttonpage"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            {currentPage > 1 && (
              <>
                <span className="pages" onClick={prevPage}>
                  {currentPage - 1}
                </span>
              </>
            )}
            <span className="poppins-semibold current">
              {currentPage}
              {"  "}
            </span>
            <span className="pages" onClick={nextPage}>
              {currentPage + 1}{" "}
            </span>
            <button
              className="buttonpage"
              onClick={nextPage}
              disabled={data.length < itemsPerPage}
            >
              {">"}
            </button>
          </div>
        </section>
        <section style={{ backgroundColor: "#F2F2F2" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "60%",
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            <h1>Les meilleurs restaurants à Paris</h1>
          </div>
          <div className="restos">
            {data.map((restaurant, index) => (
              <div
                key={index}
                className={restaurant.rating === 5 ? "content" : "hide"}
              >
                <Link
                  to={`/restaurants/${restaurant.placeId}`}
                  key={restaurant.placeId}
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
                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontSize: "15px",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ marginRight: "2px" }}>
                      {restaurant.vegan === 1 ? (
                        <img src={vegan} style={{ width: "25px" }} />
                      ) : (
                        <img src={veganopt} style={{ width: "25px" }} />
                      )}
                    </div>
                    {restaurant.name}
                  </div>
                  <div
                    className="ellipsis"
                    style={{
                      width: "275px",
                      height: "93px",
                      marginTop: "10px",
                      fontSize: "13px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "black",
                      fontWeight: "300",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "5px",
                        marginBottom: "10px",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#666666",
                      }}
                    >
                      {restaurant.address}
                    </div>
                    {restaurant.description}
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
