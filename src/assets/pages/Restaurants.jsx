import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faAward,
  faPhone,
  faLocationDot,
  faFaceSmile,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import vegan from "../img/category_vegan.svg";
import veganopt from "../img/category_veg-friendly.svg";
import icecream from "../img/category_ice-cream.svg";
import other from "../img/category_other.svg";
import store from "../img/category_health-store.svg";
import veg from "../img/category_vegetarian.svg";
import vert from "../img/markervert.png";
import rouge from "../img/markerrouge.png";
import violet from "../img/markerviolet.png";
import bleu from "../img/other_marker.png";
import jaune from "../img/health_store_marker.png";
import pink from "../img/ice_cream_marker.png";

function Restaurants() {
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
  const [positions, setPositions] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          height: "40px",
          background: "none",
          display: "flex",
          fontSize: "24px",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          height: "40px",
          background: "none",
          display: "flex",
          fontSize: "24px",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/restaurants/${id}`
        );
        const restaurantData = response.data;
        setRestaurant(restaurantData);

        const extractedPositions = [
          [restaurantData.location.lat, restaurantData.location.lng],
        ];
        setPositions(extractedPositions);
        setLoading(false);
      } catch (error) {
        setError("Error fetching restaurant data.");
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : restaurant ? (
        <>
          <div
            style={{
              display: "flex",
              marginBottom: "60px",
            }}
          >
            <div className="colonne1">
              {restaurant.rating === 5 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faAward}
                    style={{ fontSize: "25px", color: "#feb902" }}
                  />
                  <p
                    className="poppins-bold text-gradient"
                    style={{ marginLeft: "10px", fontSize: "18px" }}
                  >
                    TOP RATING IN PARIS
                  </p>
                </div>
              ) : null}
              <h1
                className="poppins-semibold"
                style={{ marginBottom: "10px", color: "#1A1A1A" }}
              >
                {restaurant.name}
              </h1>
              <div style={{ marginBottom: "20px" }}>
                {ratingStars(restaurant.rating)}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                {restaurant.category === 1 ? (
                  <div className="option yellow">
                    <img src={store} style={{ width: "25px" }} />
                    Health Store
                  </div>
                ) : restaurant.category === 99 ? (
                  <div className="option blue">
                    <img src={other} style={{ width: "25px" }} />
                    Other
                  </div>
                ) : restaurant.category === 12 ? (
                  <div className="option pink">
                    <img src={icecream} style={{ width: "25px" }} />
                    Ice Cream
                  </div>
                ) : restaurant.category === 2 ? (
                  <div className="option purple">
                    <img src={veg} style={{ width: "25px" }} />
                    Végétarien
                  </div>
                ) : null}

                {restaurant.vegan === 1 ? (
                  <div className="option green">
                    <img src={vegan} style={{ width: "25px" }} />
                    Vegan
                  </div>
                ) : (
                  <div className="option red">
                    <img src={veganopt} style={{ width: "25px" }} />
                    Vegan Options
                  </div>
                )}

                {restaurant.veganOnly === 1 ? (
                  <div className="option purple">
                    <img src={veg} style={{ width: "25px" }} />
                    Végétarien
                  </div>
                ) : null}
              </div>

              <Slider {...settings}>
                {restaurant.pictures.map((photo, index) => (
                  <>
                    <div
                      key={index}
                      style={{
                        background: `url(${photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "99%",
                        height: "200px",
                      }}
                    />
                  </>
                ))}
              </Slider>
              <p
                style={{
                  marginTop: "30px",
                  fontSize: "20px",
                  color: "#666666",
                }}
              >
                {restaurant.description}
              </p>
            </div>
            <div className="colonne2">
              <MapContainer
                center={[restaurant.location.lat, restaurant.location.lng]}
                zoom={16}
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "20px",
                }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {positions.map((position, index) => (
                  <Marker
                    key={index}
                    position={position}
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
                      Position {index + 1}: {position.join(", ")}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              <p href={restaurant.facebook}>
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faFaceSmile}
                />
                Facebook
              </p>
              <p>
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faLocationDot}
                />
                {restaurant.address}
              </p>
              <p>
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faPhone}
                />
                {restaurant.phone}
              </p>
              <p href={restaurant.website}>
                <FontAwesomeIcon
                  style={{ marginRight: "10px" }}
                  icon={faLink}
                />
                Website
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>No restaurant found.</p>
      )}
    </div>
  );
}

export default Restaurants;
