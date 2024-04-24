import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import vert from "../img/markervert.png";
import rouge from "../img/markerrouge.png";
import violet from "../img/markerviolet.png";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/restaurants`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div id="cartecontent">
      <div id="col1">
        {data.map((restaurant, index) => (
          <>
            <Link
              to={`/restaurants/${restaurant.placeId}`}
              key={restaurant.placeId}
            >
              {" "}
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
                      : restaurant.catgeory === 0 && restaurant.vegan === 1
                      ? "#22820e"
                      : "#dc5d5b",
                }}
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
                        : restaurant.catgeory === 0 && restaurant.vegan === 1
                        ? "#22820e"
                        : "#dc5d5b",
                  }}
                >
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
              </div>
            </Link>
          </>
        ))}
      </div>
      <div id="col2">
        <MapContainer center={[48.866667, 2.333333]} zoom={16} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((restaurant, index) => (
            <Marker
              key={index}
              position={[restaurant.location.lat, restaurant.location.lng]}
              icon={
                restaurant.veganOnly === 1
                  ? L.icon({
                      iconUrl: violet,
                      iconSize: [35, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                    })
                  : restaurant.vegan === 1
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
