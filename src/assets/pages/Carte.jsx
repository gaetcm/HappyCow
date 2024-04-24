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
import vegan from "../img/category_vegan.svg";
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
  const [vegan, setVegan] = useState("");
  const [category, setCategory] = useState("");
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/carte?name=${search}&skip=${skip}&limit=${itemsPerPage}`
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
    <div id="cartecontent">
      <div id="col1">
        <div className="filter">
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
          <div style={{ width: "80%", height: "80%" }}>
            <div>
              <button>vegan</button>
              <button>vegan options</button>
            </div>
            <div>
              <button
                onClick={() => {
                  setCategory("1");
                  setSearch("");
                }}
              >
                cat 1
              </button>
              <button>cat 2</button>
              <button>cat 3</button>
              <button>cat 4</button>
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
                          <img src={vegan} />
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
                {restaurant.name}
                <br />
                Lat: {restaurant.location.lat}, Lng: {restaurant.location.lng}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Carte;
