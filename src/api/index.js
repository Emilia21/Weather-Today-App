import axios from "axios";

// used api: https://openweathermap.org/api

const api = {
  base: "https://api.openweathermap.org/data/2.5/weather?",
  key: "ec6914d3e4b1d4402bbdcbf8901c3993",
};

export const getWeather = async (args) => {
  let params;
  if (args === undefined) {
    let position = {};
    await getPosition()
      .then((response) => {
        position = response;
      })
      .catch((err) => {
        return "error";
      });

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    params = [lat, lon];
  } else {
    let city = args;
    params = [city];
  }
  let data = await fetchWeather(params);
  return data;
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const fetchWeather = async (args) => {
  let url;
  switch (args.length) {
    case 1:
      let city = args[0];
      url = `${api.base}q=${city}&appid=${api.key}`;
      break;
    case 2:
      let lat, lon;
      [lat, lon] = args;
      url = `${api.base}lat=${lat}&lon=${lon}&appid=${api.key}`;
      break;
  }
  try {
    const {
      data: {
        main: { temp_max, temp_min },
        name,
        weather,
      },
    } = await axios.get(url);
    return {
      name,
      weather: {
        temp_max: kelvinToCelsius(Number(temp_max)),
        temp_min: kelvinToCelsius(Number(temp_min)),
        main: weather[0].main,
        description: weather[0].description,
      },
    };
  } catch (error) {
    return "error";
  }
};

const kelvinToCelsius = (temp) => {
  temp = temp - 273.15;
  return Math.round((temp + Number.EPSILON) * 100) / 100;
};
