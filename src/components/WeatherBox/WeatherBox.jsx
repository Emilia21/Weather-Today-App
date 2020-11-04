import React, { Fragment } from "react";
import styles from "./WeatherBox.module.css";

function WeatherBox({ name, weather }) {
  const { description, main, temp_max, temp_min } = weather;

  return (
    <Fragment>
      <div className="weather">
        <center className="show">
          <div className={styles["weather-box"]}>
            <h1>{name}</h1>
            <h2>{new Date().toDateString()}</h2>
            <h1>
              {temp_min}ºC - {temp_max}ºC
            </h1>
            <h2>{main}</h2>
            <h3>{description}</h3>
          </div>
          <small>Coded by Emilia Petkova &spades;</small>
        </center>
      </div>
    </Fragment>
  );
}

export default WeatherBox;
