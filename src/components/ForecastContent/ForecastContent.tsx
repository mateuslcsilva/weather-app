import React, { ReactComponentElement, ReactElement } from "react";
import {Chart} from 'chart.js'
import "./styles.css";
import { HourlyChart } from "../Chart/Chart";

export const ForecastContent = (props: any) => {
console.log(`assets/${props.forecastData.forecast.forecastday[0].day.condition.icon.replace('//cdn.weatherapi.com/', '')}`)
  return (
    <div className="forecast-content">
      {props.chart && (
        <div className="justify-center">
          <img src={`${props.forecastData.forecast.forecastday[props.day].day.condition.icon}`} alt="" />
        </div>
      )}
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
            {props.forecastData.forecast.forecastday[props.day].astro.sunrise}
          </strong>
        </p>
        <p>
          <strong>
            {props.forecastData.forecast.forecastday[props.day].astro.sunset}
          </strong>
        </p>
      </div>
      <div style={{ width: "100%" }} className="row">
        <div
          className="column"
          style={{ fontSize: "14pt", padding: "25px 15px", width: "52%" }}
        >
          <p style={{"textAlign" : "center"}}>
            <strong>{`Mínima: ${Math.floor(props.forecastData.forecast.forecastday[props.day].day.mintemp_c).toString()}ºC`}</strong>
          </p>
          <p style={{"textAlign" : "center"}}>
            <strong>{`Máxima: ${Math.floor(props.forecastData.forecast.forecastday[props.day].day.maxtemp_c).toString()}ºC`}</strong>
          </p>
        </div>
        <div
          className="column align-center"
          style={{ fontSize: "14pt", width: "50%", paddingTop: "2vh" }}
        >
          <i
            className={`bi bi-cloud-rain-${
              props.forecastData.forecast.forecastday[props.day].day
                .daily_chance_of_rain > 50
                ? "heavy-"
                : ""
            }fill`}
          ></i>
          <p>{`${props.forecastData.forecast.forecastday[props.day].day.daily_chance_of_rain}%`}</p>
          <p>{`${props.forecastData.forecast.forecastday[props.day].day.totalprecip_mm}mm`}</p>
        </div>
      </div>
      {props.chart && <HourlyChart forecastData={props.forecastData} day={props.day}/>}
    </div>
  );
};
