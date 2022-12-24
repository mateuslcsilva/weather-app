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
      setTimeout(() => {getBackground();}, 1000)
      getForecast();
    }
  }, [result]);

  return (
    <div
      className={`App ${result?.location ? backgroundState : "cloudy-morning"}`}
    >
      <main className="main-content">
        <div className="location-current">
          {result?.location && (
            <div className="location row align-end">
              <h2>{result.location.name}</h2>
              {/* <h2>{', ' + result.location.region}</h2> */}
              <h2>{", " + result.location.country}</h2>
              <p>{`${result.location.localtime.substring(
                11,
                16
              )}, ${result.location.localtime
                .substring(0, 10)
                .replaceAll("-", "/")}`}</p>
            </div>
          )}
          <div className="row" style={{ width: "100%" }}>
            {result?.current && (
              <div className="current">
                <p className="current-temp">
                  {result.current.temp_c}
                  <span>ºC</span>
                </p>
                <p>{result.current.condition.text}</p>
                <p>
                  {`Sensacão Térmica: ${result.current.feelslike_c}`}
                  <span>ºC</span>
                </p>
              </div>
            )}
            <hr />
            {!forecastData?.forecast && (<p>carregando</p>)}
            {forecastData?.forecast && (
              <div className="forecast-content">
                <div
                  className="row justify-around"
                  style={{ width: "100%", transform: "translateY(15%)" }}
                >
                  <i className="bi bi-sunrise-fill"></i>
                  <i className="bi bi-sunset-fill"></i>
                </div>
                <div className="row justify-around" style={{ width: "100%" }}>
                  <p>
                    <strong>
                      {forecastData.forecast.forecastday[0].astro.sunrise}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      {forecastData.forecast.forecastday[0].astro.sunset}
                    </strong>
                  </p>
                </div>
                <div style={{width: '100%'}} className="row">
                  <div
                    className="column"
                    style={{ fontSize: "14pt", padding: "25px 15px", width: '50%' }}
                  >
                    <p>
                      <strong>{`Mínima: ${forecastData.forecast.forecastday[0].day.mintemp_c.toString().substring(0,2)}ºC`}</strong>
                    </p>
                    <p>
                      <strong>{`Máxima: ${forecastData.forecast.forecastday[0].day.maxtemp_c.toString().substring(0,2)}ºC`}</strong>
                    </p>
                  </div>
                  <div
                    className="column align-center"
                    style={{ fontSize: "14pt", width: '50%', paddingTop: '2vh'}}
                  >
                    <i
                      className={`bi bi-cloud-rain-${
                        forecastData.forecast.forecastday[0].day
                          .daily_chance_of_rain > 50
                          ? "heavy-"
                          : ""
                      }fill`}
                    ></i>
                    <p>{`${forecastData.forecast.forecastday[0].day.daily_chance_of_rain}%`}</p>
                    <p>{`${forecastData.forecast.forecastday[0].day.totalprecip_mm}mm`}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="day-and-hours"></div>
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
