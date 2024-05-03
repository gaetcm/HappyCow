import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import vert from "../img/markervert.png";
import rouge from "../img/markerrouge.png";
import violet from "../img/markerviolet.png";
import bleu from "../img/other_marker.png";
import jaune from "../img/health_store_marker.png";
import pink from "../img/ice_cream_marker.png";
import veganm from "../img/category_vegan.svg";
import veganopt from "../img/category_veg-friendly.svg";
import icecream from "../img/category_ice-cream.svg";
import other from "../img/category_other.svg";
import store from "../img/category_health-store.svg";
import veg from "../img/category_vegetarian.svg";

const Carte = () => {
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

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [buttonStates, setButtonStates] = useState({
    vegan: false,
    storeFilter: false,
    vegetarian: false,
    iceCreamFilter: false,
    otherCategory: false,
    vegOnly: false,
  });
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:3000/carte?name=${search}&skip=${skip}&limit=${itemsPerPage}`;
        if (buttonStates.vegan) {
          url += "&vegan=1";
        }
        if (buttonStates.vegOnly) {
          url += "&vegOnly=1";
        }
        if (buttonStates.storeFilter) {
          url += "&category=1";
        }
        if (buttonStates.vegetarian) {
          url += "&category=2";
        }
        if (buttonStates.iceCreamFilter) {
          url += "&category=12";
        }
        if (buttonStates.otherCategory) {
          url += "&category=99";
        }
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search, skip, buttonStates]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    setSkip(skip + itemsPerPage);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
    setSkip(skip - itemsPerPage);
  };

  const handleButtonClick = (buttonName) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));
  };

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div id="cartecontent">
      <div id="col1">
        <div className="filter">
          <input
            id="search"
            value={search}
            type="search"
            name="search"
            placeholder="  Recherchez un restaurant"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className="bouttons">
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleButtonClick("vegan")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    backgroundColor: buttonStates.vegan ? "#22820e" : "white",
                    color: buttonStates.vegan ? "white" : "#666666",
                  }}
                >
                  <img src={veganm} style={{ width: "30px" }} />
                  Vegan
                </button>
                <button
                  onClick={() => handleButtonClick("vegOnly")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    backgroundColor: buttonStates.vegOnly ? "#dc5d5b" : "white",
                    color: buttonStates.vegOnly ? "white" : "#666666",
                  }}
                >
                  <img src={veganopt} style={{ width: "30px" }} />
                  Vegan options
                </button>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleButtonClick("storeFilter")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    backgroundColor: buttonStates.storeFilter
                      ? "#b89e21"
                      : "white",
                    color: buttonStates.storeFilter ? "white" : "#666666",
                  }}
                >
                  <img src={store} style={{ width: "30px" }} />
                  Store
                </button>
                <button
                  onClick={() => handleButtonClick("vegetarian")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    backgroundColor: buttonStates.vegetarian
                      ? "#89278e"
                      : "white",
                    color: buttonStates.vegetarian ? "white" : "#666666",
                  }}
                >
                  <img src={veg} style={{ width: "30px" }} />
                  Végétarien
                </button>
                <button
                  onClick={() => handleButtonClick("iceCreamFilter")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    backgroundColor: buttonStates.iceCreamFilter
                      ? "#ef447f"
                      : "white",
                    color: buttonStates.iceCreamFilter ? "white" : "#666666",
                  }}
                >
                  <img src={icecream} style={{ width: "30px" }} />
                  Ice Cream
                </button>
                <button
                  onClick={() => handleButtonClick("otherCategory")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    backgroundColor: buttonStates.otherCategory
                      ? "#3f74ba"
                      : "white",
                    color: buttonStates.otherCategory ? "white" : "#666666",
                  }}
                >
                  <img src={other} style={{ width: "30px" }} />
                  Other
                </button>
              </div>
            </div>
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
        </div>
        <div className="listeresto">
          {data.map((restaurant, index) => (
            <>
              <Link
                to={`/restaurants/${restaurant.placeId}`}
                key={restaurant.placeId}
              >
                <div
                  className="restocarte"
                  style={{
                    backgroundImage: `url(${restaurant.thumbnail})`,
                    zIndex: "20",
                    borderBottomWidth: "4px",
                    borderBottomColor:
                      restaurant.category === 1
                        ? "#b89e21"
                        : restaurant.category === 2
                        ? "#89278e"
                        : restaurant.category === 12
                        ? "#ef447f"
                        : restaurant.category === 99
                        ? "#3f74ba"
                        : restaurant.category === 0 && restaurant.vegan === 1
                        ? "#22820e"
                        : "#dc5d5b",
                  }}
                >
                  <div
                    className="couverture"
                    style={{
                      backgroundColor:
                        restaurant.category === 1
                          ? "#b89e21"
                          : restaurant.category === 2
                          ? "#89278e"
                          : restaurant.category === 12
                          ? "#ef447f"
                          : restaurant.category === 99
                          ? "#3f74ba"
                          : restaurant.category === 0 && restaurant.vegan === 1
                          ? "#22820e"
                          : "#dc5d5b",
                    }}
                  >
                    <div className="iconehover">
                      {restaurant.category === 1 ? (
                        <div className="option yellow">
                          <img src={store} />
                        </div>
                      ) : restaurant.category === 99 ? (
                        <div className="option blue">
                          <img src={other} />
                        </div>
                      ) : restaurant.category === 12 ? (
                        <div className="option pink">
                          <img src={icecream} />
                        </div>
                      ) : restaurant.category === 2 ? (
                        <div className="option purple">
                          <img src={veg} />
                        </div>
                      ) : restaurant.category === 0 &&
                        restaurant.vegan === 1 ? (
                        <div className="option green">
                          <img src={veganm} />
                        </div>
                      ) : (
                        <div className="option red">
                          <img src={veganopt} />
                        </div>
                      )}
                    </div>

                    <div className="divider"></div>
                    <p style={{ fontSize: "15px", margin: "10px" }}>
                      {restaurant.name}
                    </p>
                    <p
                      className="poppins-light"
                      style={{
                        fontSize: "10px",
                        margin: "5px",
                        marginBottom: "50px",
                      }}
                    >
                      {restaurant.address}
                    </p>
                  </div>
                  <div
                    className="poppins-medium "
                    key={index}
                    style={{
                      fontSize: "11px",
                      marginBottom: "10px",
                      color: "black",
                    }}
                  >
                    {restaurant.name}
                  </div>
                  <div style={{ marginBottom: "20px", fontSize: "13px" }}>
                    {ratingStars(restaurant.rating)}
                  </div>
                </div>
              </Link>
            </>
          ))}
        </div>
      </div>
      <div id="col2">
        <MapContainer center={[48.827, 2.349]} zoom={14.4} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((restaurant, index) => (
            <Marker
              key={index}
              position={[restaurant.location.lat, restaurant.location.lng]}
              icon={
                restaurant.category === 1
                  ? L.icon({
                      iconUrl: jaune,
                      iconSize: [35, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  : restaurant.category === 2
                  ? L.icon({
                      iconUrl: violet,
                      iconSize: [35, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  : restaurant.category === 12
                  ? L.icon({
                      iconUrl: pink,
                      iconSize: [35, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  : restaurant.category === 99
                  ? L.icon({
                      iconUrl: bleu,
                      iconSize: [35, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  : restaurant.category === 0 && restaurant.vegan === 1
                  ? L.icon({
                      iconUrl: vert,
                      iconSize: [35, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  : L.icon({
                      iconUrl: rouge,
                      iconSize: [35, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
              }
            >
              <Popup>
                <img
                  src={restaurant.thumbnail}
                  width="100%"
                  height="30%"
                  objectFit="cover"
                />
                <br />
                {restaurant.name}
                <br />
                {ratingStars(restaurant.rating)}
                <br />
                {restaurant.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Carte;
