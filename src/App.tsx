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
import "./utils/backgrounds.css";
import "./App.css";
import { LocationCurrent } from "./components/LocationCurrent/LocationCurrent";
import { NextDays } from "./components/NextDays/NextDays";
import { ForecastContent } from "./components/ForecastContent/ForecastContent";

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
    let result = await response.json();
    console.log(result, requestType);
    setRequestType("current");
    setForecastData(result);
  };

  const getData = async () => {
    let response = await fetch(
      `${BASE_URL}${requestType}.json?key=${API_KEY}&q=${cityRequested}&lang=pt`
    );
    let result = await response.json();
    setRequestType("forecast");
    console.log(result, requestType);
    setResult(result);
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
      setTimeout(() => {
        getBackground();
      }, 1000);
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
            <div className="row justify-around">
              <h2>Amanhã</h2>
              <h2>Depois</h2>
            </div>

            <div className="row justify-around">
              <p>
                {forecastData.location.localtime
                  .substring(0, 10)
                  .replaceAll("-", "/")}
              </p>
              <p>
                {forecastData.location.localtime
                  .substring(0, 10)
                  .replaceAll("-", "/")}
              </p>
            </div>

            <div className="row day-and-hours-box">
              <ForecastContent
                forecastData={forecastData}
                day={1}
                nextDays={true}
                chart={true}
              />
              <hr />
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
            onChange={(e) => setCityRequested(e.target.value)}
            value={cityRequested}
            onKeyUp={getData}
          />
        </div>
        <div className="idk-content-1"></div>
        <div className="idk-content-2"></div>
      </main>

      <div></div>
    </div>
  );
}

export default App;
