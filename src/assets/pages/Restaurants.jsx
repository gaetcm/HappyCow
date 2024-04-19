import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Restaurants() {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get("http://localhost:3000/restaurants");
        const restaurant = response.data.find(
          (restaurant) => restaurant.placeId === parseInt(id)
        );
        setRestaurant(restaurant);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchRestaurant();
  }, [id]);

  return (
    <div>
      {restaurant ? (
        <div>
          <div>
            {restaurant.pictures.map((photo) => (
              <div
                key={photo}
                style={{
                  backgroundImage: `url(${photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100px",
                  height: "100px",
                }}
              ></div>
            ))}
          </div>
          <h2>{restaurant.name}</h2>
          <p>Address: {restaurant.address}</p>
          <p>Phone: {restaurant.phone}</p>
          <p>Facebook : {restaurant.facebook}</p>
          <p>Site Web : {restaurant.website}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Restaurants;
