'use client';
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Tabs, Tab } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";

const PlanetsApp = () => {
  const [planets, setPlanets] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/planets.json")
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al cargar los planetas");
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <div className="slider-container text-center">
      <h1 className="text-2xl font-bold text-center mb-4">Planetas del Sistema Solar</h1>
      <Slider {...settings}>
        {planets.map((planet) => (
          <Card
            key={planet.name}
            className="cursor-pointer"
            onClick={() => setSelectedPlanet(planet)}
          >
            <img src={planet.image} alt={planet.name} className="planet-image mx-auto" />
            <CardContent>
              <h2 className="text-lg font-bold mt-2">{planet.name}</h2>
            </CardContent>
          </Card>
        ))}
      </Slider>

      {selectedPlanet && (
        <div className="info-container mt-6">
          <h2 className="text-2xl font-bold">{selectedPlanet.name}</h2>
          <Tabs>
            <Tab label="Masa">
              <p>{selectedPlanet.mass}</p>
            </Tab>
            <Tab label="Distancia al Sol">
              <p>{selectedPlanet.distance_from_sun}</p>
            </Tab>
            <Tab label="Temperatura">
              <p>{selectedPlanet.temperature}</p>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default PlanetsApp;
