import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Restaurants() {
  const [positions, setPositions] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
              <Slider {...settings}>
                {restaurant.pictures.map((photo, index) => (
                  <>
                    {console.log(photo)}
                    <div
                      key={index}
                      style={{
                        background: `url(${photo})`,
                        width: "100%",
                        height: "200px",
                      }}
                    ></div>
                  </>
                ))}
              </Slider>

              <h2>{restaurant.name}</h2>
              <div>
                {restaurant.vegan === 1 ? (
                  <div className="green">Vegan</div>
                ) : (
                  <div className="red">Vegan Options</div>
                )}
              </div>
              <div>
                {restaurant.veganOnly && <div className="green">Vegan</div>}
              </div>
            </div>
            <div id="colonne2">
              <MapContainer
                center={[restaurant.location.lat, restaurant.location.lng]}
                zoom={16}
                style={{ width: "400px", height: "300px" }}
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
