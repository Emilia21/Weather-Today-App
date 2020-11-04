import React, { useState, useEffect, Fragment } from "react";
import { SearchBar, WeatherBox } from "./components";
import "./index.css";
import { getWeather } from "./api/index";

function App() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(async () => {
    defaultWeather();
  }, []);

  const defaultWeather = async () => {
    let data = await getWeather();
    if (data !== "error") {
      const { name, weather } = data;
      setName(name);
      setWeather(weather);
      setLoading(false);
    }
  };

  const handleSearch = async (city) => {
    let data = await getWeather(city);
    if (data != "error") {
      const { name, weather } = data;
      setName(name);
      setWeather(weather);
      setLoading(false);
    } else {
      alert("Sorry, this city wasn't found. Try again.");
      defaultWeather();
    }
  };

  return (
    <Fragment>
      <div className="app">
        <main>
          <SearchBar
            handleSearch={handleSearch}
            defaultWeather={defaultWeather}
          />
          {/* TODO: add spinner while loading */}
          {loading ? null : <WeatherBox name={name} weather={weather} />}
        </main>
      </div>
    </Fragment>
  );
}

export default App;
