import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="prev-arrow" onClick={onClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="next-arrow"
        style={{ position: "relative", zIndex: "20" }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,

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
    nextArrow: <CustomNextArrow />,
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
              <h1 style={{ marginBottom: "20px" }}>{restaurant.name}</h1>
              <div>{ratingStars(restaurant.rating)}</div>
              <div>
                {restaurant.vegan === 1 ? (
                  <div className="green">Vegan</div>
                ) : (
                  <div className="red">Vegan Options</div>
                )}
              </div>
              <div>
                {restaurant.veganOnly && <div className="purple">Vegan</div>}
              </div>
              <Slider
                {...settings}
                // style={{
                //   display: "flex",
                //   alignItems: "center",
                //   position: "absolute",
                // }}
              >
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
