import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Restaurant = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json/${id}`
        );
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <footer>
      <div>
        <p>{data.name}</p>
      </div>
    </footer>
  );
};

export default Restaurant;
