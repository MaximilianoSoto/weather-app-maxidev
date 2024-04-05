import { useState } from "react";

const APIKEY = "51e950bb6646b7782c728872b118fde9";
const difKelvin = 273.15;

export const WeatherApp = () => {
  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ciudad.length > 0) {
      fetchClima();
      setCiudad("");
    }
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${APIKEY}`
      );
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.log("Ocurrió el siguiente problema: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Averigua el clima</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {dataClima && (
        <div className="data-container">
          <h1 className="data-name">{dataClima.name}</h1>
          <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}°c</p>
          <p>
            Condición meteorológica{" "}
            <strong className="data-weather">
              {dataClima.weather[0].description}{" "}
            </strong>
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
            alt="iconoCiudad"
          />
        </div>
      )}
    </div>
  );
};
