'use client';
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [datos, setDatos] = useState({});
  const [añoSeleccionado, setAñoSeleccionado] = useState("2024");
  const [ventasMensuales, setVentasMensuales] = useState([]);
  const [meses, setMeses] = useState([]);


  useEffect(() => {
    fetch("/ventas.json") 
      .then((response) => response.json())
      .then((data) => {
        setDatos(data);
        actualizarDatos(data, "2024");
      })
      .catch((error) => console.error("Error cargando el JSON:", error));
  }, []);

  
  const actualizarDatos = (data, año) => {
    if (data[año]) {
      setVentasMensuales(data[año].map((item) => item.ventas));
      setMeses(data[año].map((item) => item.mes));
    }
  };


  const handleCambioAño = (evento) => {
    const año = evento.target.value;
    setAñoSeleccionado(año);
    actualizarDatos(datos, año);
  };

 
  const data = {
    labels: meses,
    datasets: [
      {
        label: `Ventas de ${añoSeleccionado}`,
        data: ventasMensuales,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ventas Mensuales</h1>
      <label>Selecciona el año: </label>
      <select value={añoSeleccionado} onChange={handleCambioAño}>
        {Object.keys(datos).map((año) => (
          <option key={año} value={año}>
            {año}
          </option>
        ))}
      </select>
      <div style={{ width: "80%", margin: "0 auto" }}>
        <Line data={data} />
      </div>
    </div>
  );
};

export default App;
