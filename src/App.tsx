import { useEffect, useState } from "react";
import { BASE_URL } from "./utils/requests";
import { API_KEY } from "./utils/key";
import {
  sunny,
  cloudy,
  calmRain,
  storm,
  snow,
} from "./utils/weatherConditions";
import { morning, midDay, evening, night } from "./utils/dayPeriod";
import { daysOfWeek } from "./utils/daysOfWeek";
import "./utils/backgrounds.css";
import "./App.css";
import { LocationCurrent } from "./components/LocationCurrent/LocationCurrent";
import { NextDays } from "./components/NextDays/NextDays";
import { ForecastContent } from "./components/ForecastContent/ForecastContent";
import { HourlyCarousel } from "./components/Hourly/HourlyCarousel"

function App() {
  const [requestType, setRequestType] = useState("current");
  const [cityRequested, setCityRequested] = useState("maringa");
  const [result, setResult] = useState<any>();
  const [forecastData, setForecastData] = useState<any>();
  const [backgroundState, setBackgroundState] = useState<any>("clear-morning");

  const getForecast = async () => {
    let response = await fetch(
      `${BASE_URL}${requestType}.json?key=${API_KEY}&q=${cityRequested}&days=7&lang=pt`
    );
    let data = await response.json();
    setRequestType("current");
    setForecastData(data.location ? data : forecastData);
    console.log(data)
  };

  const getData = async () => {
    let response = await fetch(
      `${BASE_URL}${requestType}.json?key=${API_KEY}&q=${cityRequested}&lang=pt`
    );
    let data = await response.json();
    setRequestType("forecast");
    setResult(data.location ? data : result);
    console.log(data)
  };

  const getBackground = () => {
    if (result?.location) {
      let weatherConditions = "";
      let dayPeriod = "";

      if (sunny.includes(result.current.condition.code))
        weatherConditions = "clear";
      if (cloudy.includes(result.current.condition.code))
        weatherConditions = "cloudy";
      if (calmRain.includes(result.current.condition.code))
        weatherConditions = "calm-rain";
      if (storm.includes(result.current.condition.code))
        weatherConditions = "storm";
      if (snow.includes(result.current.condition.code))
        weatherConditions = "snow";

      if (morning.includes(result.location.localtime.substring(11, 13)))
        dayPeriod = "morning";
      if (midDay.includes(result.location.localtime.substring(11, 13)))
        dayPeriod = "mid-day";
      if (evening.includes(result.location.localtime.substring(11, 13)))
        dayPeriod = "evening";
      if (night.includes(result.location.localtime.substring(11, 13)))
        dayPeriod = "night";

      setBackgroundState(`${weatherConditions}-${dayPeriod}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (result?.location) {
      getBackground();
      getForecast();
    }
  }, [result]);

  return (
    <div
      className={`App ${result?.location ? backgroundState : "cloudy-morning"}`}
    >
      <main className="main-content">
        <LocationCurrent result={result} forecastData={forecastData} />
        {forecastData?.forecast && (
          <div className="day-and-hours">
            <div>
              <h2>{daysOfWeek[new Date(`${forecastData.location.localtime}`).getDay() + 1]}</h2>
              <p>
                {new Date(`${forecastData.forecast.forecastday[1].date}GMT-3`).toLocaleDateString()}
              </p>
              <ForecastContent
                forecastData={forecastData}
                day={1}
                nextDays={true}
                chart={true}
              />
            </div>
            <hr />
            <div>
              <h2>{daysOfWeek[new Date(`${forecastData.location.localtime}`).getDay() + 2]}</h2>
              <p>
                {new Date(`${forecastData.forecast.forecastday[2].date}GMT-3`).toLocaleDateString()}
              </p>
              <ForecastContent
                forecastData={forecastData}
                day={2}
                nextDays={true}
                chart={true}
              />
            </div>
          </div>
        )}
      </main>
      <main className="secondary-content">
        <div className="input-search-div">
          <input
            type="text"
            className="input-search"
            id="searchBar"
            spellCheck="false"
            autoComplete="off"
            onKeyUp={(e) => e.key == 'Enter' && document.getElementById('searchButton')?.click()}
            value={cityRequested}
            onChange={(e) => setCityRequested(e.target.value)}
          />
          <button
            style={{ all: 'unset' }}
            id="searchButton"
            onClick={getData}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
        <div className="idk-content-1"></div>
        <div className="hourly">
          <HourlyCarousel forecastData={forecastData} />
        </div>
      </main>
      <div></div>
    </div>
  );
}

export default App;
