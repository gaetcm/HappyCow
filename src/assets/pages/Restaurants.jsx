import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faStar, faAward } from "@fortawesome/free-solid-svg-icons";
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
          background: "#7B4EC3",
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
          background: "#7B4EC3",
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
          <div style={{ display: "flex" }}>
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
                    <img src={store} />
                    Health Store
                  </div>
                ) : restaurant.category === 99 ? (
                  <div className="option blue">
                    <img src={other} />
                    Other
                  </div>
                ) : restaurant.category === 12 ? (
                  <div className="option pink">
                    <img src={icecream} />
                    Ice Cream
                  </div>
                ) : restaurant.category === 2 ? (
                  <div className="option purple">
                    <img src={veg} />
                    Végétarien
                  </div>
                ) : null}

                {restaurant.vegan === 1 ? (
                  <div className="option green">
                    <img src={vegan} />
                    Vegan
                  </div>
                ) : (
                  <div className="option red">
                    <img src={veganopt} />
                    Vegan Options
                  </div>
                )}

                {restaurant.veganOnly === 1 ? (
                  <div className="option purple">
                    <img src={veg} />
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
              <p style={{ marginTop: "20px" }}>{restaurant.description}</p>
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
                  <Marker key={index} position={position}>
                    <Popup>
                      Position {index + 1}: {position.join(", ")}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              <p>Address: {restaurant.address}</p>
              <p>Phone: {restaurant.phone}</p>
              <p>Facebook : {restaurant.facebook}</p>
              <p>Site Web : {restaurant.website}</p>
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
